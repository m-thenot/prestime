import {
  FAQ_HOME_GRAPHQL_FIELDS,
  FAQ_PAGE_GRAPHQL_FIELDS,
} from "@queries/editorial-content";
import { fetchGraphQL } from "@utils/contenful";
import { IFaqFields, IFaqPageFields } from "types/contentful";

export async function getFAQPage(): Promise<IFaqPageFields> {
  const entry = await fetchGraphQL(
    `query {
        faqPageCollection(limit:1){
            items{
                ${FAQ_PAGE_GRAPHQL_FIELDS}
            }
          }
        }`,
    false
  );
  return entry?.data?.faqPageCollection?.items?.[0];
}

export async function getFAQByTag(tag: string): Promise<IFaqFields[]> {
  const entry = await fetchGraphQL(
    `query {
        faqCollection(where: {
          contentfulMetadata: { tags: { id_contains_some: ["${tag}"] } }
       }){
            items{
                ${FAQ_HOME_GRAPHQL_FIELDS}
            }
          }
        }`,
    false
  );
  return entry?.data?.faqCollection?.items;
}
