import supabase from "@utils/supabase/supabase-server";
import { IAddress } from "types/address";

const ADDRESS_TABLE = "address";

export const createAddress = async (address: IAddress, customerId: number) => {
  const result = await supabase()
    .from(ADDRESS_TABLE)
    .insert({
      formatted_address: address.formattedAddress,
      country: address.country,
      city: address.city || null,
      latitude: address.coord.lat,
      longitude: address.coord.lng,
      customer: customerId,
    })
    .select("id")
    .single();

  return result.data?.id;
};
