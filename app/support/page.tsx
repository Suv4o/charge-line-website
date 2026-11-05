import { TextPage, textPageMetadata } from "@/components/TextPage";
import { chargerDataset } from "@/lib/structured-data";

export const metadata = textPageMetadata("support");

export default function Support() {
  return <TextPage name="support" extraData={[chargerDataset]} />;
}
