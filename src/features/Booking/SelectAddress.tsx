"use client";
import { useUser } from "@contexts/user";
import React, { useEffect, useState } from "react";
import StepContent from "./StepContent";
import AuthEmbedded from "@features/Authentification/AuthEmbedded";
import Input from "@components/Input";
import Button from "@components/Button";
import MapPicker from "@components/MapPicker";
import Modal from "@components/Modal";
import { IAddress } from "types/address";
import { Pin } from "@icons";
import { useBooking } from "@contexts/booking";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import { logger } from "@utils/logger";
import colors from "tailwindcss/colors";
import { useRouter } from "next/navigation";
import { getAddressComponent } from "@utils/address";

const libraries: any[] = ["places"];

const defaultAddress = {
  formattedAddress: "",
  city: "Djibouti",
  country: "Djibouti",
  coord: {
    lat: 11.571971448573981,
    lng: 43.156802120100984,
  },
};

const SelectAddress: React.FC = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState<IAddress>(defaultAddress);
  const [inputAddress, setInputAddress] = useState("");
  const { booking, setBooking } = useBooking();
  const router = useRouter();

  const onSubmitModal = () => {
    setIsModalOpen(false);
    setInputAddress(address.formattedAddress);
    onSubmit();
  };

  const onSubmit = () => {
    setBooking({
      ...booking,
      address,
    });
    router.push(`/booking/${booking!.service!.slug}/payment`);
  };

  const handleChange = (value: string) => {
    setInputAddress(value);
  };

  const handleSelect = async (value: string) => {
    setInputAddress(value);

    try {
      const results = await geocodeByAddress(value);

      const latLng = await getLatLng(results[0]);
      setAddress({
        city: getAddressComponent(results[0].address_components, "locality"),
        country: getAddressComponent(results[0].address_components, "country"),
        formattedAddress: value,
        coord: latLng,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    if (booking?.address) {
      setInputAddress(booking.address.formattedAddress);
      setAddress(booking.address);
    }
  }, [booking]);

  return user ? (
    <StepContent
      percentProgress={75}
      title="Indiquer l’adresse ou vous souhaitez recevoir votre prestation"
      onSubmit={onSubmit}
      submitButtonDisabled={!Boolean(address?.formattedAddress)}
    >
      <div className="flex flex-col items-center">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}
          libraries={libraries}
          language="fr"
          region="DJ"
        >
          <PlacesAutocomplete
            value={inputAddress}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div className="flex flex-col	items-center w-full">
                <Input
                  label=""
                  {...getInputProps({
                    placeholder: "Saisir votre adresse...",
                  })}
                />
                <div className="drop-shadow-md max-w-md w-full">
                  {suggestions.map((suggestion) => {
                    const style = suggestion.active
                      ? { backgroundColor: colors.gray[100], cursor: "pointer" }
                      : { backgroundColor: colors.white, cursor: "pointer" };

                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className: "px-3 min-w-full py-1",
                          style,
                        })}
                        key={suggestion.id}
                      >
                        <span className="text-sm">
                          {suggestion.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </LoadScript>
        <div className="flex items-center">
          <div className="w-20 h-[1px] mr-4 bg-black" />
          <p className="my-4 text-center" key={0}>
            Ou
          </p>
          <div className="w-20 h-[1px] ml-4 bg-black" />
        </div>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setIsModalOpen(true)}
        >
          Sélectionner un point sur la carte
        </Button>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <div className="flex items-center justify-between my-2">
              <p className="max-w-[530px]">
                Placer le curseur <Pin width={22} height={22} /> à votre adresse
                :<span className="font-bold">{address.formattedAddress}</span>
              </p>
              <Button
                className="h-8 min-w-[160px] hidden sm:block cursor-pointer disabled:cursor-not-allowed"
                disabled={!address.formattedAddress}
                onClick={onSubmitModal}
              >
                Valider
              </Button>
            </div>
            <MapPicker address={address} setAddress={setAddress} />
            <Button
              className="w-full mt-3 sm:hidden"
              disabled={!address.formattedAddress}
              onClick={onSubmitModal}
            >
              Valider
            </Button>
          </Modal>
        )}
      </div>
    </StepContent>
  ) : (
    <StepContent
      percentProgress={75}
      onSubmit={() => null}
      title=""
      hasSubmitButton={false}
    >
      <AuthEmbedded />
    </StepContent>
  );
};

export default SelectAddress;
