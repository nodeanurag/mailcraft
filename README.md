# MailCraft ✉️ — Premium Email Template Studio

> **Submission for the Unlayer "Build with Elements" Challenge**
>
> A premium email template studio with 18 production-ready designs across 3 categories (Newsletter, Commerce, Events). Built using `@unlayer/react-elements` with a beautiful live editor to customize, preview, and export email-safe HTML/JSON.

---

## 🌟 Key Features

*   **Code-First & Type-Safe**: Designed entirely in React with TypeScript (`@unlayer/react-elements`), ensuring complete auto-complete and component safety.
*   **Highly Themeable & Custom Content**: Change colors (backgrounds, buttons, borders, text) and block contents dynamically. Supports pre-configured themes (Indigo, Cyberpunk, Rose, Emerald).
*   **Responsive Viewport Sandbox**: Inspect the compiled output on Desktop, Tablet, or Mobile views inside an isolated, secure sandboxed environment.
*   **Three Export Targets**:
    *   **Visual Sandbox**: Check the real-time layout in an `iframe` isolated from playground styles.
    *   **Compiled HTML**: Instant, production-ready table-based HTML, optimized to be email-client safe (Outlook, Gmail, Apple Mail).
    *   **Unlayer JSON**: Export Unlayer-compatible Design JSON so it can be loaded back into Unlayer's drag-and-drop visual editors!
    *   **React JSX Implementation**: Ready-to-copy code snippets showing how to implement the template in your own applications.

---

## 📁 Repository Structure

```bash
├── src/
│   ├── templates/
│   │   └── QuantumTemplate.tsx    # 🚀 Reusable React template (Unlayer Elements)
│   ├── components/
│   │   └── Playground.tsx         # 💻 Interactive Developer Canvas & Form Controller
│   ├── App.tsx                    # Mounts the Playground
│   ├── index.css                  # Tailwinds layers & custom theme tokens
│   └── main.tsx                   # App Entrypoint
├── tailwind.config.js             # Playground UI Layout configuration
├── postcss.config.js              # CSS build configuration (PostCSS + Tailwind v4)
└── README.md                      # Detailed project documentation
```

---

## 🚀 Getting Started

Follow these steps to run the interactive developer sandbox locally:

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
```

### 3. Start Development Server
Launch the local Vite server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to interact with the playground.

### 4. Build for Production
To build a static deployment-ready version of the playground:
```bash
npm run build
```

---

## 🛠️ Reusing the Templates (Developer Guide)

The templates are built modularly inside `src/templates/QuantumTemplate.tsx`. You can easily copy this file to your backend server or cloud functions to generate emails programmatically.

### 1. Render to HTML on Server-Side (e.g. Node, Next.js, Cloudflare Workers)
To generate email-safe HTML to send via AWS SES, SendGrid, or Resend:

```tsx
import { renderToHtml } from '@unlayer/react-elements';
import { QuantumTemplate, defaultQuantumData } from './templates/QuantumTemplate';

// 1. Customize content for a specific user
const customData = {
  ...defaultQuantumData,
  hero: {
    ...defaultQuantumData.hero,
    title: "Hey John, Here is Your Weekly Tech Digest!",
  }
};

// 2. Generate email-client safe HTML
const emailHtml = renderToHtml(
  <QuantumTemplate data={customData} mode="email" />
);

// 3. Send using your favorite email provider
// sendMail({ to: "john@example.com", html: emailHtml, subject: "Your Digest" });
```

### 2. Exporting to Unlayer Drag-and-Drop Visual Editor
To sync your code-designed template with Unlayer's standard visual builders, use `renderToJson` in your app:

```tsx
import { renderToJson } from '@unlayer/react-elements';
import { QuantumTemplate } from './templates/QuantumTemplate';

// Generate Unlayer JSON structure
const designJson = renderToJson(<QuantumTemplate mode="email" />);
console.log(designJson); // Save to database or pass to Unlayer editor.loadDesign()
```

---

## 🎨 Layout & Elements Hierarchy

Our email templates leverage the following `@unlayer/react-elements` primitives:
1.  **`<Email>` / `<Page>`**: Structural roots that dictate the final document behavior (e.g., table structure for email vs. divs for web).
2.  **`<Row>`**: Implements layout sections. Uses preset definitions like `ColumnLayouts.TwoEqual` or custom column spans to stack elegantly on mobile devices.
3.  **`<Column>`**: Flex items inside rows containing structural content. Supports padding, borders, and rounded corners.
4.  **`<Heading>` & `<Paragraph>`**: Core text wrappers supporting size, weight, leading, colors, and font-family selectors.
5.  **`<Button>`**: Formats email-safe CTA buttons without requiring CSS hacks.
6.  **`<Image>`**: Implements image elements, handling sizing constraints dynamically across screens.

---

## 🤝 Support the Elements Ecosystem
This project utilizes the free, open-source `@unlayer/react-elements` package. Consider giving them a star on GitHub!
*   **Library GitHub**: [github.com/unlayer/elements](https://github.com/unlayer/elements)
*   **Documentation Guide**: [docs.unlayer.com/docs/elements](https://docs.unlayer.com/docs/elements)
