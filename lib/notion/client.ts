import { Client } from "@notionhq/client";

const apiKey = process.env.NOTION_API_KEY;

export const notion = apiKey
  ? new Client({ auth: apiKey })
  : null;

export const notionConfigured = Boolean(apiKey);
