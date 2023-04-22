interface ICoord {
  lat: number;
  lng: number;
}

export interface IAddress {
  formattedAddress: string;
  coord: ICoord;
}
