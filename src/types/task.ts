import { IService } from "./service";

type ITaskService = Pick<IService, "title">;

export interface ITask {
  id: number;
  service: ITaskService;
  name: string;
  recommended_price: number;
}
