import { pageMarkdown, textResponse } from "@/lib/agents";

// The terms of use, as Markdown.
export const dynamic = "force-static";

export function GET() {
  return textResponse(pageMarkdown("terms"), "text/markdown");
}
