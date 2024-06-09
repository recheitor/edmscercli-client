export interface RequestCategory {
  _id: string;
  name: string;
}

export interface RequestCategoriesResponse {
  data: RequestCategory[];
}
