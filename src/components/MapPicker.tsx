import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { IAddress } from "types/address";
import Loader from "./Loader";
import { logger } from "@utils/logger";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!);
Geocode.setLanguage("fr");

const styleContainer = {
  width: "calc(100vw - 60px)",
  maxHeight: "500px",
  maxWidth: "700px",
  height: "calc(100vh - 200px)",
};

interface IMapPickerProps {
  address: IAddress;
  setAddress: React.Dispatch<React.SetStateAction<IAddress>>;
}

const MapPicker: React.FC<IMapPickerProps> = ({ address, setAddress }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  const onDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (lat && lng) {
      Geocode.fromLatLng(lat.toString(), lng.toString()).then(
        (response) => {
          const address = response.results[0].formatted_address;

          if (address.lat !== lat || address.lng !== lng) {
            setAddress({
              coord: {
                lat,
                lng,
              },
              formattedAddress: address,
            });
          }
        },
        (error) => {
          logger.error(error);
        }
      );
    }
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={styleContainer}
          center={address.coord}
          zoom={14}
        >
          <MarkerF
            onDragEnd={onDragEnd}
            position={address.coord}
            draggable={true}
          />
        </GoogleMap>
      ) : (
        <div
          style={styleContainer}
          className="flex items-center justify-center"
        >
          <Loader />
        </div>
      )}
    </>
  );
};

export default MapPicker;
