import { strict as assert } from "assert";
import { createClient } from "contentful-management";
import { EnvironmentGetter } from "contentful-typescript-codegen";
import * as dotenv from "dotenv";
dotenv.config();

const {
  CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
} = process.env;

assert(CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN);
assert(CONTENTFUL_SPACE_ID);
assert(CONTENTFUL_ENVIRONMENT);

const getContentfulEnvironment: EnvironmentGetter = () => {
  const contentfulClient = createClient({
    accessToken: CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(CONTENTFUL_ENVIRONMENT));
};
export default getContentfulEnvironment;
