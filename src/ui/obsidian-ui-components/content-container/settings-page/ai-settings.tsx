import React from "react";
import { Setting } from "obsidian";
import { SRSettings } from "src/data/settings";

interface AISettingsProps {
    settings: SRSettings;
    saveSettings: () => Promise<void>;
}

export const AISettings: React.FC<AISettingsProps> = ({ settings, saveSettings }) => {
    return (
        <div className="aisettings">
            <h2>AI & TTS Settings</h2>
            
            <div className="setting-item">
                <div className="setting-item-info">
                    <div className="setting-item-name">Enable TTS</div>
                    <div className="setting-item-description">Enable text-to-speech for flashcards.</div>
                </div>
                <div className="setting-item-control">
                    <input
                        type="checkbox"
                        checked={settings.enableTTS}
                        onChange={async (e) => {
                            settings.enableTTS = e.target.checked;
                            await saveSettings();
                        }}
                    />
                </div>
            </div>

            <div className="setting-item">
                <div className="setting-item-info">
                    <div className="setting-item-name">AI Provider</div>
                </div>
                <div className="setting-item-control">
                    <select
                        value={settings.aiProvider}
                        onChange={async (e) => {
                            settings.aiProvider = e.target.value as any;
                            await saveSettings();
                        }}
                    >
                        <option value="None">None</option>
                        <option value="Ollama">Ollama</option>
                        <option value="Claude">Claude</option>
                        <option value="Gemini">Gemini</option>
                    </select>
                </div>
            </div>

            <div className="setting-item">
                <div className="setting-item-info">
                    <div className="setting-item-name">AI API Key</div>
                </div>
                <div className="setting-item-control">
                    <input
                        type="password"
                        value={settings.aiApiKey}
                        onChange={async (e) => {
                            settings.aiApiKey = e.target.value;
                            await saveSettings();
                        }}
                    />
                </div>
            </div>

            <div className="setting-item">
                <div className="setting-item-info">
                    <div className="setting-item-name">AI Base URL</div>
                </div>
                <div className="setting-item-control">
                    <input
                        type="text"
                        value={settings.aiBaseUrl}
                        onChange={async (e) => {
                            settings.aiBaseUrl = e.target.value;
                            await saveSettings();
                        }}
                    />
                </div>
            </div>

            <div className="setting-item">
                <div className="setting-item-info">
                    <div className="setting-item-name">AI Model</div>
                </div>
                <div className="setting-item-control">
                    <input
                        type="text"
                        value={settings.aiModel}
                        onChange={async (e) => {
                            settings.aiModel = e.target.value;
                            await saveSettings();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
