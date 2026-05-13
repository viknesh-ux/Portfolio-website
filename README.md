# Cybersecurity Portfolio (Next.js + Notion)

Student portfolio with **Notion** as the headless CMS. Content is fetched on the **server** using the official Notion API (`NOTION_API_KEY` is never exposed to the browser).

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Framer Motion
- Notion API (`@notionhq/client`)
- Deploy: Vercel (recommended)

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|----------|---------|
| `NOTION_API_KEY` | Integration secret from [My integrations](https://www.notion.so/my-integrations) |
| `NOTION_DATABASE_*` | One Notion **database** ID per section (see below) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Optional heatmap section |

If `NOTION_API_KEY` is missing, the site shows built-in **fallback** demo content.

## Notion setup

1. Create a **Notion integration** and copy the **Internal Integration Secret** → `NOTION_API_KEY`.
2. For **each database** below: open the database in Notion → **⋯** → **Connections** → connect your integration (so it can read pages).
3. Copy each database ID from the URL (`notion.so/workspace/DATABASE_ID?v=...`) into the matching env var.

### Required databases & properties

Property names are **case-sensitive** and should match exactly (or adjust `lib/notion/mappers.ts`).

**Personal** (`NOTION_DATABASE_PERSONAL`) — uses **first row** only:

| Property | Type |
|----------|------|
| Name | Title |
| Role, Intro, Bio, Career Goals, Education | Rich text |
| Interests, Domains | Multi-select |
| Resume URL, GitHub, LinkedIn, Medium, Profile Image URL | URL |
| Email | Email |
| Phone | Phone |

**Skills:** Name (Title), Category (Select), Level (Select).

**Projects:** Title (Title), Description (Rich text), Thumbnail URL (URL), GitHub, Demo (URL), Tech Stack, Tags (Multi-select), Difficulty, Category (Select), Featured (Checkbox).

**Blog:** Title, Summary, Cover Image URL (URL), Medium URL, Tags, Category, Reading Time (Rich text), Published (Date), Featured.

**Certifications:** Name (Title), Issuer (Rich text), Badge URL (URL), Credential URL, Date.

**Achievements:** Title, Description, Type (Select), Date, Link (URL).

Images: use **URL** fields pointing to HTTPS images (or upload files in Notion — file URLs work until Notion expires them; URLs you control are best).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push to GitHub and import in Vercel.
2. Add the same env vars (especially `NOTION_API_KEY` and all `NOTION_DATABASE_*` IDs).
3. Ensure production URL is set in `NEXT_PUBLIC_SITE_URL`.
