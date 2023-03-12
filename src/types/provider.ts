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
