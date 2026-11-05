import { pageMarkdown, textResponse } from "@/lib/agents";

// The support page, as Markdown.
export const dynamic = "force-static";

export function GET() {
  return textResponse(pageMarkdown("support"), "text/markdown");
}
