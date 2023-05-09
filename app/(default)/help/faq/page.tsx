import "server-only";
import FaqPage from "@features/Help/FaqPage";
import { getFAQPage } from "@services/editorial-content";

export default async function Page() {
  const content = await getFAQPage();
  return <FaqPage options={content.faqItemsCollection.items} />;
}
