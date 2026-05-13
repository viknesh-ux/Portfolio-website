import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Props = PageObjectResponse["properties"];

function richTextToPlain(rich: { plain_text: string }[]): string {
  return rich.map((t) => t.plain_text).join("");
}

export function getTitle(properties: Props, key: string): string {
  const p = properties[key];
  if (!p || p.type !== "title") return "";
  return richTextToPlain(p.title);
}

export function getRichText(properties: Props, key: string): string {
  const p = properties[key];
  if (!p || p.type !== "rich_text") return "";
  return richTextToPlain(p.rich_text);
}

export function getUrl(properties: Props, key: string): string | undefined {
  const p = properties[key];
  if (!p || p.type !== "url") return undefined;
  return p.url ?? undefined;
}

export function getEmail(properties: Props, key: string): string | undefined {
  const p = properties[key];
  if (!p || p.type !== "email") return undefined;
  return p.email ?? undefined;
}

export function getPhone(properties: Props, key: string): string | undefined {
  const p = properties[key];
  if (!p || p.type !== "phone_number") return undefined;
  return p.phone_number ?? undefined;
}

export function getCheckbox(properties: Props, key: string): boolean {
  const p = properties[key];
  if (!p || p.type !== "checkbox") return false;
  return Boolean(p.checkbox);
}

export function getSelect(properties: Props, key: string): string | undefined {
  const p = properties[key];
  if (!p || p.type !== "select") return undefined;
  return p.select?.name;
}

export function getMultiSelectNames(properties: Props, key: string): string[] {
  const p = properties[key];
  if (!p || p.type !== "multi_select") return [];
  return p.multi_select.map((s) => s.name);
}

export function getDateIso(properties: Props, key: string): string | undefined {
  const p = properties[key];
  if (!p || p.type !== "date") return undefined;
  return p.date?.start ?? undefined;
}

/** First external URL from files property, or first file URL */
export function getFileUrl(properties: Props, key: string): string | undefined {
  const p = properties[key];
  if (!p || p.type !== "files") return undefined;
  const first = p.files[0];
  if (!first) return undefined;
  if (first.type === "external") return first.external.url;
  if (first.type === "file") return first.file.url;
  return undefined;
}

