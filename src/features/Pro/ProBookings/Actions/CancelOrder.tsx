"use client";
import Button from "@components/Button";
import Modal from "@components/Modal";
import Tag from "@components/Tag";
import { updateOrderState } from "@services/order/client";
import { logger } from "@utils/logger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { IBookingCard } from "types/booking";
import { OrderState } from "types/order";

interface ICancelOrderProps {
  booking: IBookingCard;
}

const CancelOrder: React.FC<ICancelOrderProps> = ({ booking }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    async ({ orderId }: { orderId: number }) => {
      try {
        await updateOrderState(orderId, OrderState.CANCELED_BY_PROVIDER);
        toast.success("Commande annulée !");
        setIsModalOpen(false);
        router.refresh();
      } catch (e) {
        logger.error("Failed to cancel the order", {
          error: e,
        });
        toast.error(
          "Une erreur inattendue s'est produite. Merci de réessayer ou de contacter le support client."
        );
      }
    }
  );

  return (
    <>
      <Tag text="En cours" className="absolute right-0 top-0" />
      <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
        Annuler la commande
      </Button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p>Êtes-vous sûr de vouloir annuler cette commande ? </p>

          <div className="flex gap-2 justify-between mt-5">
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Fermer
            </Button>
            <Button
              className="w-full"
              isLoading={isLoading}
              onClick={() => {
                mutate({
                  orderId: booking.id,
                });
              }}
            >
              Oui, je veux annuler
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CancelOrder;
