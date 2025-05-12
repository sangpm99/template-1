// 👉 Update Patch For All
export interface UpdatePatchParams {
  operationType: number;
  path: string;
  op: string;
  from?: any;
  value: any;
}

export interface ExtraStatus {
  status: string | null;
  counter: number;
}

export interface SearchQuery {
  pageIndex: number;
  pageSize: number;
  searchValue?: string;
}

export interface PagedResponse<T, K = undefined> {
  pageIndex: number;
  pageSize: number;
  itemsCount: number;
  items: T[];
  extra?: K[];
}

export interface ErrorResponse<T = undefined> {
  response: {
    status: number;
    data: {
      title?: string;
      errors?: T;
    };
  };
}

export interface SelectOptions {
  title: string;
  value: any;
}

export interface ApiError {
  action: string;
  code: string;
  message: string;
  timestamp: number;
}
