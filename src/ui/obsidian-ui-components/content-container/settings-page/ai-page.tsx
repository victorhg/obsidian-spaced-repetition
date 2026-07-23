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
            .setName("AI Provider")
            .setDesc("Select the AI provider to use.")
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
