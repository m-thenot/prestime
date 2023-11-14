import { IService } from "./service";

export interface ICategory {
  id: number;
  title: string;
  image: string;
  services: any;
  slug: string;
}

export interface ICategoryWithServices {
  id: number;
  title: string;
  services: Pick<IService, "id" | "title" | "slug">[];
  slug: string;
}
