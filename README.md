# ✉️ MailCraft — Multi-Channel Email Studio & Visual Template Engine

**A white-label, production-ready marketing design workspace and email campaign engine.**

MailCraft is a premium, unified content workbench built for marketing teams and developers. It enables brands to describe their design details, color palettes, fonts, product lines, and discount promotions **once** in a single structured JSON object, and instantly generates beautifully styled, channel-specific assets for **Email Campaigns**, **Standalone Web Pages**, and **Print-ready Documents & PDFs**.

### 🌓 Dark Mode Hero
![MailCraft Studio Landing Hero Dark](public/assets/landing-hero-dark.png)

### 🌓 Light Mode Hero
![MailCraft Studio Landing Hero Light](public/assets/landing-hero-light.png)

---

## 📌 Problem Statement

Marketing and product engineering teams face significant friction maintaining design consistency, copy updates, and compatibility across communication channels:
1. **Double Data Entry & Fragmentation:** Announcing a new product line or launching a flash sale requires manual copy-pasting across promotional email campaigns (Mailchimp/Klaviyo), standalone landing pages (Vite/React pages), and print-ready PDF invoices or event invitations.
2. **Pricing & Copy Mismatches:** Discrepancies between printed materials, online product listings, and email campaigns lead to brand confusion, reduced conversion rates, and pricing errors.
3. **Responsive Client Overhead:** Designing separately for Email (which requires legacy, table-based responsive HTML styling), Web (which requires modern, flexible CSS grids), and Print (which requires static page margins and precise A4 aspect ratios) typically demands different design tools or expensive engineering resources.

---

## 💡 The Solution: MailCraft

MailCraft addresses these challenges using the philosophy of **"One source of truth → Multiple beautifully rendered outputs."** Powered by `@unlayer/react-elements` compatible blocks, the studio reads a single data schema and renders branded outputs across three media viewports:

1. 📧 **Promotional Email Newsletter:** A responsive, single-column table layout optimized for email clients, containing brand headers, editorial intro notes, spotlight cards, and feedback surveys.
2. 📱 **Mobile & Desktop Web Page:** A mobile-first, interactive digital page featuring responsive web layouts, custom font stacks, and a live-updating web preview.
3. 📄 **Print Documents & PDFs:** A print-formatted document engine that outputs A4 portrait sheets, complete with page-break margin safeguards and print stylesheets suitable for physical mailers or handouts.

### 🎨 Visual Theme Presets Catalog
Users can instantly swap the branding aesthetic using 6 curated designer presets. The studio dynamically translates typography families, color variables, borders, button configurations, and shadow depths across all formats.

#### Dark Mode presets
![Designed for every brand style (Dark)](public/assets/landing-presets-dark.png)

#### Light Mode presets
![Designed for every brand style (Light)](public/assets/landing-presets-light.png)

### 🗂️ Rich Template Presets (18 Layouts)
While MailCraft provides a catalog of **18 professional templates** spanning Newsletter digests, E-commerce showcases, and Event launches, here are screenshots of 5 selected templates live-rendered by our rendering compiler:

| **Weekly Digest (Editorial)** | **Founder Letter (Editorial)** |
| :---: | :---: |
| ![Weekly Digest](public/assets/template-weekly-digest.png) | ![Founder Letter](public/assets/template-founder-letter.png) |

| **New Collection (Commerce)** | **Flash Sale (Commerce)** |
| :---: | :---: |
| ![New Collection](public/assets/template-new-collection.png) | ![Flash Sale](public/assets/template-flash-sale.png) |

| **Product Launch (Event)** |
| :---: |
| ![Product Launch](public/assets/template-product-launch.png) |

---

## 🛠️ Multi-Channel Output Workspace

Every marketing template compiles to multiple outputs in real time. The rendering logic preserves design tokens across all views:

### 💻 Split View Workspace Layout
A split-screen workspace featuring the real-time **Sidebar Customizer** panel on the left and a live-updating **Format Preview Viewport** showing output channels simultaneously. Includes responsive mobile, tablet, and desktop simulations.

#### Dark Mode Workspace
![Workspace Split View Layout (Dark)](public/assets/workspace-split-view-dark.png)

#### Light Mode Workspace
![Workspace Split View Layout (Light)](public/assets/workspace-split-view-light.png)

### 🎨 Unlayer Visual Builder Tab
Need customized structural revisions? Switch tabs to launch the fully featured **Drag & Drop Editor** powered by Unlayer, loaded with your active design configuration.

![Unlayer Visual Editor](public/assets/unlayer-editor.png)

### 📤 Comprehensive Export Panel
* **Save Config JSON:** Download the structured customizer parameters to import later.
* **Save Editor JSON:** Download the Unlayer drag-and-drop schema layout.
* **Copy HTML outputs:** Instant copy-to-clipboard actions for compiled Email HTML and Print HTML.
* **Export High-Res PDF:** Launch standard system print dialogs with pre-loaded print stylesheet variables.
* **Capture PNG Images:** Trigger client-side canvas rendering to download visual snapshot graphics.

---

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 🔧 Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/nodeanurag/mailcraft.git
   cd mailcraft
   ```
2. Install package dependencies:
   ```bash
   npm install
   ```

### 💻 Local Development
1. Start the Vite local development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:5173](http://localhost:5173) in your browser to access the studio.

### 📸 Auto-Generating Screenshots
If you modify templates or branding themes and wish to update the documentation screenshots automatically:
1. Make sure the local dev server is running (`npm run dev`).
2. Run the screenshot capture automation script:
   ```bash
   npm run screenshot
   ```
   *Note: This utilizes Playwright in headless mode to navigate the workspace, click presets, and export screenshots directly to `public/assets/`.*

### 🏗️ Production Build
Compile and bundle the project for production distribution:
```bash
npm run build
```
The compiled output will be generated inside the `dist/` directory.

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.
