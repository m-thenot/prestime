import SelectShedule from "@features/Booking/SelectSchedule";
import "server-only";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const MINIMUM_TIME_DELAY = 4;

const buildSchedules = () => {
  dayjs.locale("fr");
  const days = [];

  for (let i = 0; i < 7; i++) {
    const d = dayjs().add(i, "day");
    const timeSlots = [];
    let timeStart = 8;

    if (i === 0) {
      timeStart = d.add(MINIMUM_TIME_DELAY + 1, "hour").get("hour");
    }

    for (let j = timeStart; j < 20; j++) {
      const time = d.set("hour", j).set("minute", 0);

      timeSlots.push({
        value: time.valueOf(),
        display: time.format("H"),
      });
    }

    if (timeSlots.length > 0) {
      days.push({
        name: d.format("dddd"),
        value: d.set("hour", 0).set("minute", 0).valueOf(),
        display: d.format("ddd D MMMM"),
        timeSlots,
      });
    }
  }

  return days;
};

export default async function Page() {
  const schedules = buildSchedules();

  return <SelectShedule schedules={schedules} />;
}
