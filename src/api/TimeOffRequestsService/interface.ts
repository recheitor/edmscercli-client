export interface NewTimeOffRequestData {
  employee_id?: string;
  request_category_id: string;
  start_date: string ;
  end_date: string;
}

export interface TimeOffRequest {
  _id: string;
  employee_id: string;
  request_category_id: {
    _id: string;
    name: string;
  };
  start_date: string;
  end_date: string;
}