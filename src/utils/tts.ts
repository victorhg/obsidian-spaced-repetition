export class TTSUtil {
    static speak(text: string, voiceName?: string): void {
        if (!("speechSynthesis" in window)) {
            console.error("Speech Synthesis not supported in this browser.");
            return;
        }

        window.speechSynthesis.cancel(); // Stop any currently playing audio

        const utterance = new SpeechSynthesisUtterance(text);
        
        if (voiceName) {
            const voices = window.speechSynthesis.getVoices();
            const voice = voices.find((v) => v.name === voiceName);
            if (voice) {
                utterance.voice = voice;
            }
        }

        window.speechSynthesis.speak(utterance);
    }

    static getVoices(): SpeechSynthesisVoice[] {
        return window.speechSynthesis.getVoices();
    }
}
