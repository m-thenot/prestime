import "server-only";

import TaskDescription from "@features/Booking/TaskDescription";

export const revalidate = 3600;

export default async function Page() {
  return <TaskDescription />;
}
