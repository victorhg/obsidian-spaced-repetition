import { SRSettings } from "src/data/settings";

export class TTSUtil {
    private static currentAudio: HTMLAudioElement | null = null;

    static async speak(text: string, settings: SRSettings, lang?: string): Promise<void> {
        // Stop any currently playing audio
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }

        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

        if (settings.ttsProvider === "openai-compatible") {
            try {
                const baseUrl = settings.ttsBaseUrl.replace(/\/$/, "");
                const url = `${baseUrl}/audio/speech`;

                const headers: Record<string, string> = {
                    "Content-Type": "application/json",
                };

                if (settings.ttsApiKey) {
                    headers["Authorization"] = `Bearer ${settings.ttsApiKey}`;
                }

                const response = await fetch(url, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        model: settings.ttsModel || "kokoro",
                        input: text,
                        voice: settings.ttsVoice || "default",
                    }),
                });

                if (!response.ok) {
                    const errText = await response.text();
                    console.error("TTS API error:", errText);
                    return;
                }

                const blob = await response.blob();
                const audioUrl = URL.createObjectURL(blob);
                this.currentAudio = new Audio(audioUrl);
                
                await this.currentAudio.play();
                return;
            } catch (e) {
                console.error("Failed to play OpenAI-compatible TTS, falling back to browser TTS:", e);
            }
        }

        // Fallback to browser SpeechSynthesis
        if (!("speechSynthesis" in window)) {
            console.error("Speech Synthesis not supported in this browser.");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);

        if (lang) {
            utterance.lang = lang;
        }

        const voices = window.speechSynthesis.getVoices();
        
        if (settings.ttsVoice) {
            const voice = voices.find((v) => v.name === settings.ttsVoice);
            if (voice) {
                utterance.voice = voice;
            }
        } else if (lang) {
            const voice = voices.find((v) => v.lang.startsWith(lang) || v.lang.replace('_', '-').startsWith(lang));
            if (voice) {
                utterance.voice = voice;
            }
        }

        window.speechSynthesis.speak(utterance);
    }
}
