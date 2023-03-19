"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { IBooking } from "types/booking";

interface IBookingContext {
  booking: IBooking | null;
  setBooking: React.Dispatch<React.SetStateAction<IBooking | null>>;
  isLoading: boolean;
}

export const BookingContext = createContext<IBookingContext>({
  booking: null,
  setBooking: () => {},
  isLoading: true,
});

const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [booking, setBooking] = useState<IBooking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("booking");
    if (storedData) {
      setBooking(JSON.parse(storedData));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (booking) {
      // save data to local storage whenever it changes
      localStorage.setItem("booking", JSON.stringify(booking));
    }
  }, [booking]);

  return (
    <BookingContext.Provider value={{ booking, setBooking, isLoading }}>
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => useContext(BookingContext);

export { useBooking, BookingProvider };
