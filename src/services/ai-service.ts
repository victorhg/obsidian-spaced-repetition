import { SRSettings } from "src/data/settings";

export interface AIResponse {
    content: string;
    error?: string;
}

export class AIService {
    private settings: SRSettings;

    constructor(settings: SRSettings) {
        this.settings = settings;
    }

    async ask(prompt: string): Promise<AIResponse> {
        switch (this.settings.aiProvider) {
            case "Ollama":
                return this.callOllama(prompt);
            case "Claude":
                return this.callClaude(prompt);
            case "Gemini":
                return this.callGemini(prompt);
            default:
                return { content: "", error: "Provider not configured" };
        }
    }

    private async callOllama(prompt: string): Promise<AIResponse> {
        try {
            const response = await fetch(`${this.settings.aiBaseUrl}/api/generate`, {
                method: "POST",
                body: JSON.stringify({
                    model: this.settings.aiModel,
                    prompt: prompt,
                    stream: false,
                }),
            });
            const data = await response.json();
            return { content: data.response };
        } catch (e) {
            return { content: "", error: e.toString() };
        }
    }

    private async callClaude(prompt: string): Promise<AIResponse> {
        // Implementation for Claude API
        return { content: "", error: "Not implemented yet" };
    }

    private async callGemini(prompt: string): Promise<AIResponse> {
        // Implementation for Gemini API
        return { content: "", error: "Not implemented yet" };
    }
}
