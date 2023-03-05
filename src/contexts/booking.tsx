"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { IBooking } from "types/booking";

interface IBookingContext {
  booking: IBooking | null;
  setBooking: React.Dispatch<React.SetStateAction<IBooking | null>>;
}

export const BookingContext = createContext<IBookingContext>({
  booking: null,
  setBooking: () => {},
});

const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [booking, setBooking] = useState<IBooking | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("booking");
    if (storedData) {
      setBooking(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (booking) {
      // save data to local storage whenever it changes
      localStorage.setItem("booking", JSON.stringify(booking));
    }
  }, [booking]);

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => useContext(BookingContext);

export { useBooking, BookingProvider };
