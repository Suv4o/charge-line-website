import { homeMarkdown, textResponse } from "@/lib/agents";

// The home page, as Markdown.
export const dynamic = "force-static";

export function GET() {
  return textResponse(homeMarkdown(), "text/markdown");
}
