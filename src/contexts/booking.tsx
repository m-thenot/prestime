"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { IBooking } from "types/booking";

interface IBookingContext {
  booking: IBooking | null;
  setBooking: React.Dispatch<React.SetStateAction<IBooking | null>>;
  isLoading: boolean;
  skipProviderSelection: boolean;
}

export const BookingContext = createContext<IBookingContext>({
  booking: null,
  setBooking: () => {},
  isLoading: true,
  skipProviderSelection: true,
});

const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [booking, setBooking] = useState<IBooking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const skipProviderSelection = useRef(true).current;

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
    } else {
      localStorage.removeItem("booking");
    }
  }, [booking]);

  return (
    <BookingContext.Provider
      value={{ booking, setBooking, isLoading, skipProviderSelection }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => useContext(BookingContext);

export { useBooking, BookingProvider };
