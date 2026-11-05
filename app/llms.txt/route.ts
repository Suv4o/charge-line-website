import { llmsTxt, textResponse } from "@/lib/agents";

// For AI agents: what Charge Line is and where to read more (llmstxt.org).
export const dynamic = "force-static";

export function GET() {
  return textResponse(llmsTxt(), "text/plain");
}
