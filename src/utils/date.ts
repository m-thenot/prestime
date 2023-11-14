import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");

export const getFullDateFormatted = (date: string) =>
  `${dayjs(date).format("ddd D MMMM - HH")}h`;
