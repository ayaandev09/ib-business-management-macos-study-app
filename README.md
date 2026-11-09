# 💼 C-Suite Matrix // IB Business Management
### The IB Business Management Study Dashboard for macOS & Windows

**C-Suite Matrix** is a native cross-platform application built for International Baccalaureate (IB) Diploma Business Management students (SL & HL). It combines comprehensive 2024–2026 syllabus analysis, C-Suite frameworks, 15 BMT toolkit models, and real-world multinational case studies with an emerald Liquid Glass bento interface, active revision flashcards, an Academic Handwritten Notes Studio, and native desktop widgets across both **macOS** (`.app` / `.dmg`) and **Windows** (`.exe` standalone via Tauri v2).

---

## 📸 Interface Preview & Navigation

### 1. The Command Center (Hero Overview)
<img width="1441" height="928" alt="Hero Overview" src="docs/01-hero-command-center.png" />

The primary launchpad provides a high-level view of your syllabus progress and current strategic study target:
* **C-Suite Syllabus Mastery Tracker**: Tracks completion across all 5 Core Units, 52 syllabus modules, and 15 BMT models in real time, calculating estimated remaining study hours.
* **Syllabus Unit Sidebar**: Jump straight into any module across Unit 1 (Business Organisation), Unit 2 (HRM), Unit 3 (Finance & Accounts), Unit 4 (Marketing), and Unit 5 (Operations Management).
* **Strategic Module Bento**: Displays core learning objectives, real-world corporate case anchors (e.g. Tesla, Patagonia, Apple, McDonald's), and C-Suite strategic recommendations.
* **Global Spotlight Search**: Press `⌘K` (macOS) or `Ctrl+K` (Windows) to search across all syllabus modules, quantitative formulas, BMT models, and examiner evaluation tips.

---

### 2. Analytical Hub & Concept / BMT Matrix
<img width="1441" height="928" alt="Concept & BMT Matrix" src="docs/03-concept-matrix.png" />

Designed specifically for IB Paper 1 (Pre-released Case Study), Paper 2 (Data Response), and Paper 3 (Social Enterprise HL) exam preparation:
* **4 Key Concepts Matrix**: Seamlessly analyze any business decision through the lenses of Creativity, Change, Ethics, and Sustainability.
* **15 BMT Quantitative Tools**: Interactive breakdowns of Ansoff Matrix, BCG Matrix, Porter's Generic Strategies, SWOT/STEEPLE, Force Field Analysis, Decision Trees, and Critical Path Analysis (HL).
* **10/10 SLAP Evaluative Framework**: Detailed guidance for structuring high-scoring evaluation (Stakeholders, Long-term vs. Short-term, Assumptions, Priorities).

---

### 3. Active Revision & Continuous Flow
<img width="1441" height="928" alt="Active Revision Mode" src="docs/04-active-recall-cram.png" />

* **Continuous Flow Stream**: Read uninterrupted syllabus overviews, case studies, and evaluative commentary in a vertical, distraction-free stream.
<img width="1442" height="922" alt="Continuous Flow" src="docs/02-continuous-flow.png" />

* **Active Recall Flashcards**: Test memory retrieval on quantitative formulas, leadership theories (Taylor, Mayo, Herzberg, Pink), and corporate strategies.
* Switch between modes at any time using the Study and Revision toggle in the top bar.

---

### 4. ✍️ Academic Handwritten Notes Studio
A distraction-free, analog-feel digital notebook seamlessly embedded inside the analytical inspector and module cards:
* **Ruled Notebook Texture**: Authentic 28px repeating guide lines engineered specifically for case analysis, evaluations, and mock exam planning.
* **Curated Academic Handwriting Typography**: Precision-styled cursive font stack featuring *Caveat*, *Kalam*, *Noteworthy*, and *Snell Roundhand*.
* **Live Telemetry Console**: Real-time counter tracking words, characters, and reading duration.
* **Action Shortcuts**: Quick bullet insertion (`• Bullet`), quotation framing (`"Quote"`), one-click clipboard copying, and canvas reset.
* **100% Offline Persistence**: Automatically persists draft arguments and notes on-device via `localStorage`.

---

### 5. Formulas & C-Suite Glossary Dossier
<img width="1441" height="928" alt="Glossary & Formulas" src="docs/05-glossary-formulas.png" />

* **28 Quantitative Formulas**: Instant formulas for Break-Even, ARR, NPV, Profitability Ratios, Liquidity Ratios, and Efficiency Ratios with worked examples.
* **Key Terminology Glossary**: Over 120 IB examiner definitions for rapid reference.

---

### 6. Desktop Widgets (macOS WidgetKit)
Keep revision top-of-mind without keeping the full app open:
* **Live Study Counter**: Displays active study streak, remaining syllabus modules, and current BMT tool on your macOS desktop or Notification Center.
* **Multi-Size Liquid Glass Templates**: Available in Small, Medium, and Large dossier view.
* **Local Offline Sync**: Synchronizes instantly across macOS without requiring an account login or cloud database.

---

## ⌨️ Keyboard Shortcuts

* `⌘ + K` / `Ctrl + K`: Open quick Spotlight search for business topics, formulas, and cases
* `⌘ + B` / `Ctrl + B`: Toggle sidebar navigation drawer
* `⌘ + I` / `Ctrl + I`: Toggle Pro Analytical Inspector
* `⌘ + E` / `Ctrl + E`: Launch Timed Exam Sprint mode
* `1`: Switch to Single Module Bento view
* `2`: Switch to Continuous Flow stream view
* `3`: Switch to Active Recall & Cram hub
* `4`: Switch to Concept & BMT Matrix view
* `5`: Switch to Glossary & Formulas dossier

---

## 🛠️ Technical Highlights & Architecture

* **Modern Web Core**: Built using Next.js 16, React 19, and Tailwind CSS.
* **Native macOS Shell**: Runs inside an Apple AppKit and WKWebView container with smooth 120 FPS animations.
* **Native Windows Shell**: High-efficiency standalone executable compiled via **Tauri v2** and Microsoft Edge WebView2 (~8.4 MB executable).
* **On-Device Storage**: Local state management persists notes, bookmarks, and progress directly on your device via Zustand and `localStorage`.
* **Zero Dependencies**: Fully self-contained local build requiring no external cloud databases.

---

## 📦 Downloads & Installation

| Platform | Format | Release Asset | Notes |
| :--- | :--- | :--- | :--- |
| 🍎 **macOS** | `.dmg` Installer | [**`IBBusinessCodex-macOS-v1.0.1.dmg`**](https://github.com/ayaandev09/ib-business-management-macos-study-app/releases/download/v1.0.1/IBBusinessCodex-macOS-v1.0.1.dmg) | Drag-to-Applications disk image with `First-Time Open Helper.command` |
| 🪟 **Windows** | `.exe` Standalone | [**`IBBusinessCodex-Windows-v1.0.1.exe`**](https://github.com/ayaandev09/ib-business-management-macos-study-app/releases/download/v1.0.1/IBBusinessCodex-Windows-v1.0.1.exe) | Standalone portable executable powered by Tauri v2 & WebView2 |

### 🍎 macOS Installation Instructions
1. Download [**`IBBusinessCodex-macOS-v1.0.1.dmg`**](https://github.com/ayaandev09/ib-business-management-macos-study-app/releases/download/v1.0.1/IBBusinessCodex-macOS-v1.0.1.dmg) and double-click to open.
2. Drag the **IB Business Management App** into your `/Applications` folder.
3. Launch the app. If macOS Gatekeeper flags an unnotarized developer alert:
   - Double-click the included `First-Time Open Helper.command` inside the DMG, or
   - Right-click the app in `/Applications` and select **Open**, or go to **System Settings → Privacy & Security** and click **Open Anyway**.

### 🪟 Windows Installation Instructions
1. Download [**`IBBusinessCodex-Windows-v1.0.1.exe`**](https://github.com/ayaandev09/ib-business-management-macos-study-app/releases/download/v1.0.1/IBBusinessCodex-Windows-v1.0.1.exe) directly.
2. Place the executable in your preferred directory (e.g., Desktop or `Program Files`).
3. Double-click to launch. If Windows SmartScreen displays *"Windows protected your PC"*, click **More info** → **Run anyway**.

## 🏗️ Building from Source

### Web Bundle
```bash
npm install
npm run build
```

### Windows Standalone (.exe via Tauri v2)
```bash
# Direct build on Windows
cargo tauri build

# Or cross-compile from macOS with cargo-xwin
cargo xwin build --release --target x86_64-pc-windows-msvc
```

---

## 🎓 IB CAS Alignment

* **Creativity**: Conceptualizing, architecting, and engineering a native cross-platform study dashboard featuring an emerald Liquid Glass design system, interactive BMT financial tools, handwritten notes canvas, and desktop widgets.
* **Service**: Open-sourcing the software to provide secondary school business and economics students globally with a modern, distraction-free exam companion.
