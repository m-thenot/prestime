"use client";
import RadioGroup from "@components/RadioGroup";
import Stars from "@components/Stars";
import { useBooking } from "@contexts/booking";
import { getAllTaskProvidersByTask } from "@services/task-provider";
import { sum } from "radash";
import React, { useMemo, useState } from "react";
import StepContent from "./StepContent";
import Image from "next/image";
import AvatarImage from "@images/avatar.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import Loader from "@components/Loader";

const SelectProvider: React.FC = () => {
  const { booking, setBooking } = useBooking();
  const [taskProvider, setTaskProvider] = useState<number>(0);
  const router = useRouter();
  const {
    isIdle,
    isLoading,
    data: taskProviders,
  } = useQuery(
    ["taskProviders", booking?.task?.id],
    () => getAllTaskProvidersByTask(booking!.task!.id),
    {
      enabled: Boolean(booking?.task?.id),
    }
  );

  const onSelect = () => {
    setBooking({
      ...booking,
      taskProvider:
        taskProvider === 0
          ? null
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
                  className="text-sm font-semibold hidden sm:block"
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
      {isIdle || isLoading ? (
        <div className="h-[250px] flex items-center justify-center">
          <Loader color="black" />
        </div>
      ) : (
        options && (
          <RadioGroup
            hasTwoColumns={false}
            center={false}
            options={options!}
            defaultValue={booking?.taskProvider?.id || 0}
            onChange={(value) => setTaskProvider(value)}
            dividers={[
              {
                id: 0,
                node: (
                  <p className="my-4 text-center" key={0}>
                    Ou
                  </p>
                ),
              },
            ]}
          />
        )
      )}
    </StepContent>
  );
};

export default SelectProvider;
