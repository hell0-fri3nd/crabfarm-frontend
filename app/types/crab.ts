export type Crab = {
  log_id: number;
  crab_id: string;
  type: string;
  width: number;
  weight: number;
  created_at: string;
  group_by: string;
  crab_name: string;
};

export type ApiCrabResponse = {
  status_code: number;
  detail: string;
};
