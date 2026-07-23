import { SettingsPage } from "src/ui/obsidian-ui-components/content-container/settings-page/settings-page";
import { SRSettings } from "src/data/settings";
import { DataManager } from "src/data/data-manager";
import SRPlugin from "src/main";
import { AISettings } from "src/ui/obsidian-ui-components/content-container/settings-page/ai-settings";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { SettingsPageType } from "src/ui/obsidian-ui-components/content-container/settings-page/settings-page-manager";

export class AIPage extends SettingsPage {
    private root: Root;
    private plugin: SRPlugin;

    constructor(
        containerEl: HTMLElement,
        plugin: SRPlugin,
        settingsManager: any,
        dataManager: DataManager,
        pageType: SettingsPageType,
        applySettingsUpdate: (callback: () => void) => void,
        display: () => void,
        openPage: (pageType: SettingsPageType) => void,
        scrollListener: (scrollPosition: number) => void,
    ) {
        super(containerEl, pageType, openPage, scrollListener);
        this.plugin = plugin;
        this.root = createRoot(this.containerEl);
    }

    render(): void {
        this.root.render(
            <AISettings
                settings={this.plugin.settings}
                saveSettings={async () => {
                    await this.plugin.saveSettings();
                }}
            />
        );
    }

    destroy(): void {
        this.root.unmount();
    }
}
