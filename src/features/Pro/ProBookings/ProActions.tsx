"use client";
import Button from "@components/Button";
import Tag from "@components/Tag";
import { IBookingCard } from "types/booking";
import { OrderState } from "types/order";
import CancelOrder from "./Actions/CancelOrder";
import NewOrderActions from "./Actions/NewOrderActions";

interface IProActionsProps {
  booking: IBookingCard;
}

const ProActions: React.FC<IProActionsProps> = ({ booking }) => {
  const renderComponents = () => {
    switch (booking.state) {
      case OrderState.SUBMITED:
        return <NewOrderActions booking={booking} />;

      case OrderState.ACCEPTED:
        return <CancelOrder booking={booking} />;

      default:
        return null;
    }
  };

  return renderComponents();
};

export default ProActions;
