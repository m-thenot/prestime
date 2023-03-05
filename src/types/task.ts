export interface ITaskDB {
  id: number;
  service: number;
  name: string;
  recommended_price: number | null;
}

export interface ITask {
  id: number;
  name: string;
  recommended_price: number | null;
}
