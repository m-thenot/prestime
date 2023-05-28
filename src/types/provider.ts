interface ITaskProviderReview {
  id: number;
  rating: number;
}

interface IPublicProvider {
  id: number;
  firstname: string;
  lastname: string;
  description?: string;
  reviews: ITaskProviderReview[];
}

export interface ITaskProviderDB {
  id: string;
  created_at: number;
  provider: number;
  task: number;
  price: number;
  min_estimated_cost: number | null;
  max_estimated_cost: number | null;
  payable_in_advance: boolean;
}

export interface ITaskProvider {
  id: number;
  provider: IPublicProvider;
  price: number;
  min_estimated_cost: number | null;
  max_estimated_cost: number | null;
  payable_in_advance: boolean;
}

export interface IProvider {
  id: number;
  created_at: Date;
  firstname: string;
  lastname: string;
  phone_number: string;
  user_id: string;
  is_individual: boolean;
  description?: string;
  company_name?: string;
  financial_id: string;
}

export type IInsertProvider = Pick<
  IProvider,
  "firstname" | "lastname" | "user_id" | "phone_number" | "financial_id"
>;
