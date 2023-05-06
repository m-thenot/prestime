import { SERVICE_GRAPHQL_FIELDS } from "@queries/service";
import { fetchGraphQL } from "@utils/contenful";
import supabase from "@utils/supabase/supabase-server";
import { IServiceFields } from "types/contentful";

const SERVICE_TABLE = "service";

export const getAllServicesByCategory = async (categoryId: number) => {
  const { data: services, error } = await supabase()
    .from(SERVICE_TABLE)
    .select("id, title, category, image, slug")
    .eq("category", categoryId);

  if (services) {
    return services;
  } else {
    throw error;
  }
};

export const getServiceBySlug = async (slug: string) => {
  const { data: service, error } = await supabase()
    .from(SERVICE_TABLE)
    .select("id, title, category, image, slug")
    .eq("slug", slug)
    .single();

  if (service) {
    return service;
  } else {
    throw error;
  }
};

export async function getServiceContentBySlug(
  slug: string
): Promise<IServiceFields> {
  const entry = await fetchGraphQL(
    `query {
        serviceCollection(where: {slug: "${slug}" }, limit:1) {
          items {
            ${SERVICE_GRAPHQL_FIELDS}
          }
        }
      }`,
    false
  );
  return entry.data.serviceCollection.items[0];
}
