interface ICoord {
  lat: number;
  lng: number;
}

export interface IAddressDB {
  id: number;
  created_at: number;
  formatted_address: string;
  country: string;
  city?: string;
  latitude: number;
  longitude: number;
  customer: number;
}

export interface IAddress {
  formattedAddress: string;
  country: string;
  city?: string;
  coord: ICoord;
}
