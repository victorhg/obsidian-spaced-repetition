# Pull Request: Add OpenAI-Compatible TTS & Local Caching to Spaced Repetition

## Overview
This PR introduces a robust **Text-to-Speech (TTS)** feature to the Obsidian Spaced Repetition plugin. It empowers users to listen to their flashcard prompts using either browser speech synthesis or high-performance neural TTS servers (such as **Kokoro**, **oMLX**, or **OpenAI**) supporting the standard `/v1/audio/speech` endpoint.

---

## Key Features Implemented

1. **Flexible TTS Providers**:
   - **Browser Speech**: Fallback using native browser `SpeechSynthesis`.
   - **OpenAI-Compatible (`/v1/audio/speech`)**: Direct integration with local or cloud neural TTS engines.

2. **Automatic Language Detection**:
   - Automatically detects Mandarin Chinese characters (`zh-CN`) versus other languages (`pt-BR`) to ensure correct voice pronunciation and accent mapping.

3. **Front-Card Audio Target**:
   - The audio playback focuses exclusively on the **front of the card** (the prompt), regardless of whether the user is viewing the prompt or the answer breakdown.

4. **Local Vault Audio Caching & Visual Indicator**:
   - Audio files are hashed and cached locally in `.obsidian/plugins/obsidian-spaced-repetition/cache/`.
   - Subsequent card plays load instantly from disk with **zero network hits**.
   - The toolbar TTS button features a dynamic visual indicator (accent color highlight and tooltip) when a card's audio is cached.

5. **Settings Management & Cache Control**:
   - Dedicated configuration page (**AI & TTS**) for Base URL, API Key, Model, and Voice selection.
   - Built-in **Test Connection** button to verify TTS server connectivity.
   - Dedicated **Clear Audio Cache** button to easily purge cached audio files.

6. **Markdown & HTML Text Cleaner**:
   - Sanitizes card fronts by stripping markdown symbols (`**`, `==`, `[[links|alias]]`, etc.) and HTML tags to prevent truncation or punctuation parsing issues on TTS servers.

---

## Implications & Technical Details

- **Zero Breaking Changes**: All new settings are optional and default to safe fallback values (`browser` mode).
- **Offline & Local Friendly**: Designed to work seamlessly with local neural TTS containers (like Kokoro-FastAPI) over `http://localhost`.
- **Performance Optimized**: Local binary caching minimizes redundant API calls and ensures lightning-fast card review audio playback.
