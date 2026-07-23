import { DataManager } from "src/data/data-manager";
import { SettingsManager } from "src/data/settings-manager";
import SRPlugin from "src/main";
import { SettingsPage } from "src/ui/obsidian-ui-components/content-container/settings-page/settings-page";
import { AISettings } from "src/ui/obsidian-ui-components/content-container/settings-page/ai-settings";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { SettingsPageType } from "src/ui/obsidian-ui-components/content-container/settings-page/settings-page-manager";

export class AIPage extends SettingsPage {
    private root: Root;

    constructor(
        containerEl: HTMLElement,
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
            containerEl,
            plugin,
            settingsManager,
            dataManager,
            pageType,
            applySettingsUpdate,
            display,
            openPage,
            scrollListener
        );
        this.root = createRoot(this.containerEl);
    }

    render(): void {
        this.root.render(
            <AISettings
                settings={this.plugin.settingsManager.settings}
                saveSettings={async () => {
                    await this.plugin.saveSettings();
                }}
            />
        );
    }

    destroy(): void {
        this.root.unmount();
        super.destroy();
    }
}
