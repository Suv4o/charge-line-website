import { llmsFullTxt, textResponse } from "@/lib/agents";

// For AI agents: the whole site in one Markdown file.
export const dynamic = "force-static";

export function GET() {
  return textResponse(llmsFullTxt(), "text/plain");
}
