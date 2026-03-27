# 🚀 ProspectAI

**Intelligent B2B Prospecting powered by Google Gemini AI.**

ProspectAI is a modern web application designed to streamline the lead generation process. By leveraging the power of **Gemini 2.5 Flash** and **Google Maps API**, it identifies high-quality B2B prospects based on specific Ideal Customer Profiles (ICP) and geographic locations.

---

## 🌟 About

ProspectAI transforms the way businesses find new clients. Simply describe your target audience (ICP) and location, and our AI-driven engine will:

- Scan Google Maps for relevant businesses.
- Extract key contact information (Phone, Website, Social Media).
- Provide a centralized dashboard for lead management and qualification.

---

## ✨ Features

- **AI-Powered Search**: Define your ICP in natural language, and let Gemini 2.5 Flash do the heavy lifting.
- **Google Maps Integration**: Access real-time business data directly from Google's global database.
- **Intelligent Lead Scoring**: Automatically sort leads based on digital presence and potential "pain scores."
- **Interactive Dashboard**: View, filter, and drill down into lead details with a premium, responsive UI.
- **One-Click Outreach**: Integrated WhatsApp communication for immediate lead engagement.
- **Modern Aesthetics**: Built with a sleek, high-end design using Tailwind CSS 4 and Lucide icons.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **AI Engine**: [Google Generative AI](https://ai.google.dev/) (Gemini 2.5 Flash)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (useState, useEffect)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with Zod validation
- **Animations**: [Motion](https://motion.dev/)

---

## ⚙️ Setup

### Prerequisites

- Node.js 18+ installed.
- A [Google AI Studio API Key](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/jcarlosamorim/ProspectAI.git
    cd ProspectAI
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory and add your Gemini API Key:
    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
    ```

---

## 🚀 Running the Project

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

---

## 🗺️ Roadmap: Next Features

- [ ] **CRM Integration**: Export leads directly to HubSpot, Salesforce, or Pipedrive.
- [ ] **Automated Email Outreach**: Send personalized AI-generated cold emails.
- [ ] **Advanced Data Enrichment**: Fetch LinkedIn profiles and detailed company financial data.
- [ ] **Collaboration Tools**: Share lead lists and notes with your sales team.
- [ ] **Custom AI Agents**: Train specialized agents for different prospecting niches.
- [ ] **Whatsapp Integration**: Send messages directly to leads via WhatsApp.

---

Developed with ❤️ for the next generation of sales professionals.
