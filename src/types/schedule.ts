export interface ITimeSlot {
  display: string;
  value: number;
}

export interface ISchedule {
  display: string;
  value: number;
  name: string;
  timeSlots: ITimeSlot[];
}
