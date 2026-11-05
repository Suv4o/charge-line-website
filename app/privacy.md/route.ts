import { pageMarkdown, textResponse } from "@/lib/agents";

// The privacy policy, as Markdown.
export const dynamic = "force-static";

export function GET() {
  return textResponse(pageMarkdown("privacy"), "text/markdown");
}
