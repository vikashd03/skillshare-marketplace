import { Category, ROLE, TaskStatus, USER_TYPE } from "./constants";

export interface User {
  id?: string;
  name?: string;
  email: string;
  ph_no: string;
  address?: string;
  password: string;

  role?: ROLE;
  user_type: USER_TYPE;

  // Company-specific
  rep_name?: string;
  company_name?: string;
  tax_no?: string;

  created_at?: Date;
  updated_at?: Date;
}

export interface SkillProvider {
  name: string;
  company_name: string;
}

export enum SKILL_FIELD {
  Category = "category",
  Experience = "experience",
  Nature = "nature",
  Rate = "rate",
  Currency = "currency",
}

export enum TASK_FIELD {
  Category = "category",
  Name = "name",
  Description = "description",
  ExpectedStartDate = "expectedStartDate",
  ExpectedHours = "expectedHours",
  UserId = "userId",
  ProviderId = "providerId",
  Offered = "offered",
  HourlyRateOffered = "hourlyRateOffered",
  RateCurrency = "rateCurrency",
  TaskStatus = "taskStatus",
  OfferRsvp = "offerRsvp",
  CompletionRsvp = "completionRsvp",
}

export enum WorkMode {
  ONSITE = "ONSITE",
  ONLINE = "ONLINE",
}

export enum Currency {
  USD = "USD",
  AUD = "AUD",
  SGD = "SGD",
  INR = "INR",
}

export interface SkillData {
  id?: string;
  [SKILL_FIELD.Category]: Category;
  [SKILL_FIELD.Experience]: number;
  [SKILL_FIELD.Nature]: WorkMode;
  [SKILL_FIELD.Rate]: number;
  [SKILL_FIELD.Currency]: Currency;
}

export interface SkillDataWithProvider extends SkillData {
  provider_id: string;
  provider: SkillProvider;
}

export interface TaskData {
  id?: string;
  [TASK_FIELD.Category]: string;
  [TASK_FIELD.Name]: string;
  [TASK_FIELD.Description]: string;
  [TASK_FIELD.ExpectedStartDate]: string;
  [TASK_FIELD.ExpectedHours]: number;
}

export enum RSVPStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export const RSVPStatusLabelMap: Record<RSVPStatus, string> = {
  [RSVPStatus.PENDING]: "Pending",
  [RSVPStatus.ACCEPTED]: "Accepted",
  [RSVPStatus.REJECTED]: "Rejected",
}

export interface TaskDetails {
  id: string;

  [TASK_FIELD.Name]: string;
  [TASK_FIELD.Description]: string;
  [TASK_FIELD.Category]: Category;
  [TASK_FIELD.ExpectedStartDate]: string;
  [TASK_FIELD.ExpectedHours]: number;
  [TASK_FIELD.UserId]: string;
  [TASK_FIELD.ProviderId]?: string;
  [TASK_FIELD.Offered]: boolean;
  [TASK_FIELD.HourlyRateOffered]?: number;
  [TASK_FIELD.RateCurrency]?: Currency;
  [TASK_FIELD.TaskStatus]: TaskStatus;
  [TASK_FIELD.OfferRsvp]: RSVPStatus;
  [TASK_FIELD.CompletionRsvp]: RSVPStatus;

  user: {
    name?: string;
    company_name?: string;
  };

  provider: {
    name?: string;
    company_name?: string;
  };
}
