"use client";

import { useBooking } from "@contexts/booking";
import React from "react";

const TaskDescription: React.FC = () => {
  const { booking } = useBooking();

  return <p>description</p>;
};

export default TaskDescription;
