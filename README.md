# Checkout Flow

A highly interactive, accessible, and responsive multi-step checkout web application built entirely using modern native web technologies. This project showcases structured state management, real-time input validation, custom loading indicators, and dynamic feedback states under an architecture designed for high code quality and clear separation of concerns.

---

## How to Run Locally

Because this project is built using native JavaScript ES Modules (`import`/`export`), modern browsers prevent it from running directly via the local file system (`file://` protocol) due to security restrictions (CORS policies). It must be served through a local development server environment.

### Option A: VS Code Live Server (Recommended & Easiest)
1. Open your project directory in **Visual Studio Code**.
2. Go to the Extensions tab on the left sidebar (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for **Live Server** (by Ritwick Dey) and click **Install**.
4. Once installed, click the **Go Live** button in the bottom-right status bar of VS Code.
5. Your default web browser will instantly launch and open `http://127.0.0.1:5500/index.html`.

### Option B: Node.js (Zero-Install Runner)
If you have Node.js installed on your machine, navigate to the project directory in your terminal and execute:
```bash
npx host-it
# OR
npx local-server