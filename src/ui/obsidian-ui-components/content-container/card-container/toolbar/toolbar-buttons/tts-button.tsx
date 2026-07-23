import { setIcon } from "obsidian";
import EmulatedPlatform from "src/utils/platform-detector";
import { Platform } from "obsidian";

export default class TTSButtonComponent {
    public buttonEl: HTMLButtonElement;

    constructor(
        containerEl: HTMLElement,
        onClick: () => void,
        classes: string[] = []
    ) {
        this.buttonEl = containerEl.createEl("button", {
            cls: [...classes, "sr-tts-button"],
        });
        setIcon(this.buttonEl, "volume-2");
        this.buttonEl.setAttribute("aria-label", "Text-to-Speech");
        this.buttonEl.addEventListener("click", onClick);
    }
}
