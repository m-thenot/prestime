import { select } from "radash";

export const getAddressComponent = (
  addressComponents: any[],
  property: string
) =>
  select(
    addressComponents,
    (r) => r.long_name,
    (r) => r.types.includes(property)
  )[0];
