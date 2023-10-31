"use client";

import { LinkButton } from "@components/Button";
import theme from "constants/theme";
import { WhatsApp } from "icons/WhatsApp";
import { IUserBooking, PaymentMethod } from "types/booking";
import Image from "next/image";
import AvatarImage from "@images/avatar.svg";
import { sum } from "radash";
import Stars from "@components/Stars";
import { Arrow } from "@icons";
import { getFullDateFormatted } from "@utils/date";
import OrderDetails from "@components/OrderDetails";

interface IProBookingDetailsProps {
  booking: IUserBooking;
}

const ProBookingDetails: React.FC<IProBookingDetailsProps> = ({ booking }) => {
  return (
    <OrderDetails
      title="Ma commande"
      booking={booking}
      detailsTitle="Ma commande en détails"
    >
      <div className="max-w-md">
        <h2 className="mb-4">Mon client</h2>

        <div className="flex mb-4">
          <Image
            src={AvatarImage}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />

          <div className="ml-3">
            <p className="font-bold mb-1">{booking.customer.firstname}</p>
          </div>
        </div>

        <LinkButton
          variant="secondary"
          href={`tel:${booking.customer.phone_number.replace(/\s/g, "")}`}
          className="w-full"
        >
          Contacter {booking.customer.firstname}
        </LinkButton>
      </div>
    </OrderDetails>
  );
};

export default ProBookingDetails;
