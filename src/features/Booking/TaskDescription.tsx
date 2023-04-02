"use client";

import { useBooking } from "@contexts/booking";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import StepContent from "./StepContent";

const TaskDescription: React.FC = () => {
  const { booking, setBooking } = useBooking();
  const router = useRouter();
  const [text, setText] = useState<string | null>(null);

  const onSubmit = () => {
    setBooking({
      ...booking,
      comment: text,
    });
    booking?.service &&
      router.push(`/booking/${booking.service.slug}/providers`);
  };

  return (
    <StepContent
      percentProgress={30}
      onSubmit={onSubmit}
      title="Dîtes-nous en plus (optionnel)"
    >
      <textarea
        id="message"
        rows={4}
        defaultValue={booking?.comment || ""}
        onChange={({ target }) => setText(target.value)}
        className="block p-2.5 w-full text-sm bg-gray-50 border rounded-md border-gray-300 h-60 sm:h-40"
        placeholder="Décrivez nous exactement ce dont vous avez besoin..."
      ></textarea>
    </StepContent>
  );
};

export default TaskDescription;
