import "server-only";

import SelectTask from "@features/Booking/SelectTask";
import { getAllTasksByService } from "@services/task";
import { getServiceBySlug } from "@services/service";

export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  const tasks = await getAllTasksByService(service.id);

  return <SelectTask tasks={tasks} service={service} />;
}
