"use client";
import RadioGroup from "@components/RadioGroup";
import Stars from "@components/Stars";
import { useBooking } from "@contexts/booking";
import { getAllTaskProvidersByTask } from "@services/task-provider";
import { sum } from "radash";
import React, { useEffect, useMemo, useState } from "react";
import { ITaskProvider } from "types/provider";
import StepContent from "./StepContent";
import Image from "next/image";
import AvatarImage from "@images/avatar.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SelectProvider: React.FC = () => {
  const { booking, setBooking } = useBooking();
  const [taskProviders, setTaskProviders] = useState<
    ITaskProvider[] | undefined
  >();
  const [taskProvider, setTaskProvider] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    const getTaskProviders = async () => {
      if (!booking?.cartContent) {
        return;
      }
      const taskProviders = await getAllTaskProvidersByTask(
        booking.cartContent.id
      );
      setTaskProviders(taskProviders);
    };

    getTaskProviders();
  }, [booking?.cartContent]);

  const onSelect = () => {
    setBooking({
      ...booking,
      taskProvider:
        taskProvider === 0
          ? "default"
          : taskProviders?.find((tp) => tp.id === taskProvider),
    });
    router.push(`/booking/${booking!.service!.slug}/schedule`);
  };

  const options = useMemo(() => {
    if (taskProviders) {
      const providerOptions = [
        {
          value: 0,
          node: (
            <div className="ml-3 w-full">
              <p className="font-bold mb-1">Faîtes nous confiance</p>
              <p>
                EasyService sélectionnera le meilleur prestataire selon vos
                disponibilités
              </p>
            </div>
          ),
        },
      ];
      taskProviders.map((tp) => {
        const rating =
          sum(tp.provider.reviews, (r) => r.rating) /
          tp.provider.reviews.length;
        providerOptions.push({
          value: tp.id,
          node: (
            <div className="ml-3 w-full">
              <div className="flex justify-between w-full">
                <div className="flex">
                  <Image
                    src={AvatarImage}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full"
                  />

                  <div className="ml-3">
                    <p className="font-bold mb-1">
                      {tp.provider.firstname} {tp.provider.lastname}
                    </p>
                    <Stars averageRating={rating} />
                  </div>
                </div>
                <Link
                  href="/login"
                  className="text-sm font-semibold"
                  target="_blank"
                >
                  Voir son profil complet
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-3 line-clamp-3">
                {tp.provider.description}
              </p>
            </div>
          ),
        });
      });
      return providerOptions;
    }
  }, [taskProviders]);

  return (
    <StepContent
      percentProgress={45}
      title="Sélectionner votre prestataire"
      onSubmit={onSelect}
    >
      {options && (
        <RadioGroup
          columns={1}
          center={false}
          options={options}
          defaultValue={0}
          onChange={(value) => setTaskProvider(value)}
          dividers={[
            {
              id: 0,
              node: <p className="my-4 text-center">Ou</p>,
            },
          ]}
        />
      )}
    </StepContent>
  );
};

export default SelectProvider;
