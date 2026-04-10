export type SchedulerPayload = {
  type: string;
  scheduler_type: string;
  hour: number;
  seconds: number;
  is_enabled: boolean;
};