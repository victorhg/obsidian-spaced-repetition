import { SRSettings } from "src/data/settings";
import { Notice } from "obsidian";

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

        console.log("TTS Provider configured:", settings.ttsProvider);
        console.log("TTS Base URL configured:", settings.ttsBaseUrl);

        if (settings.ttsProvider === "openai-compatible") {
            try {
                const baseUrl = settings.ttsBaseUrl ? settings.ttsBaseUrl.replace(/\/$/, "") : "http://localhost:8880/v1";
                const url = `${baseUrl}/audio/speech`;

                console.log("Sending TTS request to:", url, {
                    model: settings.ttsModel || "kokoro",
                    input: text,
                    voice: settings.ttsVoice || "default",
                });

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
                    console.error("TTS API error response:", response.status, errText);
                    new Notice(`TTS API Error (${response.status}): ${errText}`);
                    return;
                }

                const blob = await response.blob();
                const audioUrl = URL.createObjectURL(blob);
                this.currentAudio = new Audio(audioUrl);
                
                await this.currentAudio.play();
                console.log("TTS audio playback started successfully.");
                return;
            } catch (e) {
                console.error("Failed to fetch/play OpenAI-compatible TTS:", e);
                new Notice(`TTS Request Failed: ${e.toString()}`);
                return; // Do NOT fall back to browser TTS so you can see why it failed!
            }
        }

        // Fallback to browser SpeechSynthesis (only if provider is explicitly 'browser')
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
