import SelectTask from "@features/Booking/SelectTask";
import { getAllTasksByService } from "@services/task";
import "server-only";

export default async function Page() {
  const serviceId = 9;
  const tasks = await getAllTasksByService(serviceId);

  return <SelectTask tasks={tasks} />;
}
