import { Setting } from "obsidian";
import { DataManager } from "src/data/data-manager";
import { SettingsManager } from "src/data/settings-manager";
import SRPlugin from "src/main";
import { SettingsPage } from "src/ui/obsidian-ui-components/content-container/settings-page/settings-page";
import { SettingsPageType } from "src/ui/obsidian-ui-components/content-container/settings-page/settings-page-manager";

export class AIPage extends SettingsPage {
    constructor(
        pageContainerEl: HTMLElement,
        plugin: SRPlugin,
        settingsManager: SettingsManager,
        dataManager: DataManager,
        pageType: SettingsPageType,
        applySettingsUpdate: (callback: () => unknown) => void,
        display: () => void,
        openPage: (pageType: SettingsPageType) => void,
        scrollListener: (scrollPosition: number) => void,
    ) {
        super(
            pageContainerEl,
            plugin,
            settingsManager,
            dataManager,
            pageType,
            applySettingsUpdate,
            display,
            openPage,
            scrollListener,
        );

        const settings = this.settingsManager.settings;

        new Setting(this.containerEl)
            .setName("Enable TTS")
            .setDesc("Enable text-to-speech for flashcards.")
            .addToggle((toggle) =>
                toggle
                    .setValue(settings.enableTTS)
                    .onChange(async (value) => {
                        settings.enableTTS = value;
                        await this.settingsManager.save();
                    }),
            );

        new Setting(this.containerEl)
            .setName("TTS Provider")
            .setDesc("Choose between browser speech or an OpenAI-compatible TTS server (like Kokoro, oMLX, OpenAI).")
            .addDropdown((dropdown) =>
                dropdown
                    .addOptions({
                        browser: "Browser Speech (Default)",
                        "openai-compatible": "OpenAI-compatible (/v1/audio/speech)",
                    })
                    .setValue(settings.ttsProvider)
                    .onChange(async (value: any) => {
                        settings.ttsProvider = value;
                        await this.settingsManager.save();
                        this.display();
                    }),
            );

        if (settings.ttsProvider === "openai-compatible") {
            new Setting(this.containerEl)
                .setName("TTS Base URL")
                .setDesc("Base URL for your TTS server (e.g., http://localhost:8880/v1 or https://api.openai.com/v1).")
                .addText((text) =>
                    text
                        .setPlaceholder("http://localhost:8880/v1")
                        .setValue(settings.ttsBaseUrl)
                        .onChange(async (value) => {
                            settings.ttsBaseUrl = value.trim();
                            await this.settingsManager.save();
                        }),
                );

            new Setting(this.containerEl)
                .setName("TTS API Key")
                .setDesc("API key if required by your TTS server (leave blank if not needed).")
                .addText((text) =>
                    text
                        .setPlaceholder("API Key")
                        .setValue(settings.ttsApiKey)
                        .onChange(async (value) => {
                            settings.ttsApiKey = value.trim();
                            await this.settingsManager.save();
                        }),
                );

            new Setting(this.containerEl)
                .setName("TTS Model")
                .setDesc("Model name (e.g. kokoro or tts-1).")
                .addText((text) =>
                    text
                        .setPlaceholder("kokoro")
                        .setValue(settings.ttsModel)
                        .onChange(async (value) => {
                            settings.ttsModel = value.trim();
                            await this.settingsManager.save();
                        }),
                );

            new Setting(this.containerEl)
                .setName("TTS Voice")
                .setDesc("Voice identifier (e.g. af_sky or alloy).")
                .addText((text) =>
                    text
                        .setPlaceholder("af_sky")
                        .setValue(settings.ttsVoice)
                        .onChange(async (value) => {
                            settings.ttsVoice = value.trim();
                            await this.settingsManager.save();
                        }),
                );
        } else {
            new Setting(this.containerEl)
                .setName("Browser TTS Voice Name")
                .setDesc("Optional specific voice name from your browser list.")
                .addText((text) =>
                    text
                        .setPlaceholder("Voice Name")
                        .setValue(settings.ttsVoice)
                        .onChange(async (value) => {
                            settings.ttsVoice = value.trim();
                            await this.settingsManager.save();
                        }),
                );
        }

        new Setting(this.containerEl)
            .setName("AI Provider")
            .setDesc("Select the AI text provider to use.")
            .addDropdown((dropdown) =>
                dropdown
                    .addOptions({
                        None: "None",
                        Ollama: "Ollama",
                        Claude: "Claude",
                        Gemini: "Gemini",
                    })
                    .setValue(settings.aiProvider)
                    .onChange(async (value: any) => {
                        settings.aiProvider = value;
                        await this.settingsManager.save();
                    }),
            );

        new Setting(this.containerEl)
            .setName("AI API Key")
            .setDesc("API key for the selected AI provider.")
            .addText((text) =>
                text
                    .setPlaceholder("Enter API key")
                    .setValue(settings.aiApiKey)
                    .onChange(async (value) => {
                        settings.aiApiKey = value.trim();
                        await this.settingsManager.save();
                    }),
            );

        new Setting(this.containerEl)
            .setName("AI Base URL")
            .setDesc("Base URL (e.g. http://localhost:11434 for Ollama).")
            .addText((text) =>
                text
                    .setPlaceholder("http://localhost:11434")
                    .setValue(settings.aiBaseUrl)
                    .onChange(async (value) => {
                        settings.aiBaseUrl = value.trim();
                        await this.settingsManager.save();
                    }),
            );

        new Setting(this.containerEl)
            .setName("AI Model")
            .setDesc("Model name (e.g. llama3 or mistral).")
            .addText((text) =>
                text
                    .setPlaceholder("llama3")
                    .setValue(settings.aiModel)
                    .onChange(async (value) => {
                        settings.aiModel = value.trim();
                        await this.settingsManager.save();
                    }),
            );
    }
}
