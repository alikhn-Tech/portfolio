# Ali Khan — Personal Portfolio

A personal portfolio showcasing my work across **Digital Growth, Performance Marketing, AI Automation, and Web Development**.

The website is built with Next.js and powered by Sanity CMS for blog content management.

**Live Website:** https://portfolio-pi-sage-97.vercel.app  
**GitHub Repository:** https://github.com/alikhn-Tech/portfolio

---

## Tech Stack

- **Frontend:** Next.js 15, React 19
- **Styling:** Tailwind CSS v4, DaisyUI
- **CMS:** Sanity
- **Content Rendering:** Portable Text
- **Animations:** Framer Motion
- **Deployment:** Vercel
- **Version Control:** Git and GitHub

## Features

- Responsive personal portfolio website
- Dedicated pages for About, Projects, Case Studies, and Expertise
- Blog powered by Sanity CMS
- Separate Sanity Studio for managing blog content
- Automatic blog revalidation through a Sanity webhook
- SEO metadata, sitemap, and robots.txt generation
- Contact form integration through an n8n webhook

## Project Structure

```text
portfolio/
├── app/                    # Next.js application and routes
│   ├── about/
│   ├── blog/
│   ├── case-studies/
│   ├── contact/
│   ├── expertise/
│   ├── projects/
│   └── api/
├── components/             # Reusable UI components
├── data/                   # Portfolio data
├── lib/
│   └── sanity/             # Sanity client, queries and helpers
├── public/                 # Static assets
├── scripts/                # SEO generation scripts
├── studio-portfolio/       # Sanity Studio and schemas
├── .env.example            # Environment variable template
├── next.config.mjs
└── package.json
```

## Getting Started

### Requirements

- Node.js and npm
- Git
- A Sanity account for CMS functionality

### 1. Clone the repository

```bash
git clone https://github.com/alikhn-Tech/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root using `.env.example` as your reference.

Configure the following variables:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_N8N_WEBHOOK_URL=

NEXT_PUBLIC_SANITY_PROJECT_ID=ktndwv6h
NEXT_PUBLIC_SANITY_DATASET=production

SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
```

Use your own production domain, webhook URL, and private credentials where required. Never commit `.env.local` or expose private API tokens.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sanity CMS

The Sanity Studio is maintained separately inside `studio-portfolio/`.

To run it locally:

```bash
cd studio-portfolio
npm install
npm run dev
```

Use the Sanity project configuration to connect the Studio to your project.

To build or deploy the Studio:

```bash
npm run build
npm run deploy
```

Blog content is managed through Sanity rather than editing individual blog pages in the Next.js source code.

### Automatic Blog Updates

The project includes a Next.js API route:

```text
/api/revalidate
```

A Sanity webhook can call this endpoint when blog content is published or unpublished, allowing the relevant blog pages to be refreshed.

Configure the same revalidation secret in Sanity and the production environment.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Generate production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seo:gen` | Generate SEO files |

## Deployment

The Next.js application is designed for deployment on Vercel.

1. Connect the GitHub repository to Vercel.
2. Configure the required environment variables.
3. Deploy the application.
4. Configure the Sanity webhook for automatic blog revalidation.

## Author

**Ali Khan**

Digital Growth | Performance Marketing | AI Automation | Web Development

GitHub: [@alikhn-Tech](https://github.com/alikhn-Tech)

Website: [Portfolio](https://portfolio-pi-sage-97.vercel.app)

---

*Personal portfolio project built with Next.js and Sanity CMS.*
