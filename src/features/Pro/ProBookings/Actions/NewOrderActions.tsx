import Button from "@components/Button";
import Modal from "@components/Modal";
import RadioGroup from "@components/RadioGroup";
import { useMemo, useState } from "react";
import { IBookingCard } from "types/booking";
import { useMutation } from "react-query";
import { acceptOrder, updateAppointmentDate } from "@services/order/client";
import { logger } from "@utils/logger";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getFullDateFormatted } from "@utils/date";

interface INewOrderActionsProps {
  booking: IBookingCard;
}

const NewOrderActions: React.FC<INewOrderActionsProps> = ({ booking }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState<string>(
    booking.appointment.suggested_dates[0]
  );
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    async ({
      date,
      appointmentId,
      orderId,
    }: {
      date: string;
      orderId: number;
      appointmentId: number;
    }) => {
      try {
        await updateAppointmentDate(date, appointmentId);
        await acceptOrder(orderId);
        toast.success("Commande acceptée !");
        setIsModalOpen(false);
        router.refresh();
      } catch (e) {
        logger.error("Failed to accept the order", {
          error: e,
        });
        toast.error(
          "Une erreur inattendue s'est produite. Merci de réessayer ou de contacter le support client."
        );
      }
    }
  );

  const options = useMemo(
    () =>
      booking.appointment.suggested_dates.map((date) => {
        return {
          value: date,
          label: getFullDateFormatted(date),
        };
      }),
    [booking.appointment.suggested_dates]
  );

  return (
    <>
      <Button className="mb-2" onClick={() => setIsModalOpen(true)}>
        Accepter la commande
      </Button>
      <Button variant="secondary">Refuser la commande</Button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p className="my-3">
            Sélectionner un horaire parmi ceux proposés par le client:
          </p>
          <RadioGroup
            options={options}
            center
            hasTwoColumns={false}
            onChange={(value) => setDateSelected(value as string)}
            defaultValue={options[0].value}
          />
          <Button
            className="mt-5 w-full"
            isLoading={isLoading}
            onClick={() => {
              mutate({
                date: dateSelected,
                orderId: booking.id,
                appointmentId: booking.appointment.id,
              });
            }}
          >
            Confirmer
          </Button>
        </Modal>
      )}
    </>
  );
};

export default NewOrderActions;
