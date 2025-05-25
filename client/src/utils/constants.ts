export enum ROLE {
  USER = "USER",
  PROVIDER = "PROVIDER",
}

export const RoleLabelMap: Record<ROLE, string> = {
  [ROLE.USER]: "User",
  [ROLE.PROVIDER]: "Provider",
};

export enum USER_TYPE {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY",
}

export const UserTypeLabelMap: Record<USER_TYPE, string> = {
  [USER_TYPE.INDIVIDUAL]: "Individual",
  [USER_TYPE.COMPANY]: "Company",
};

export enum Category {
  FRONTEND_DEVELOPMENT = "FRONTEND_DEVELOPMENT",
  CYBERSECURITY = "CYBERSECURITY",
  DIGITAL_MARKETING = "DIGITAL_MARKETING",
  UI_UX_DESIGN = "UI_UX_DESIGN",
  DATA_ENGINEERING = "DATA_ENGINEERING",
}

export const CategoryLabelMap: Record<Category, string> = {
  [Category.FRONTEND_DEVELOPMENT]: "Frontend Development",
  [Category.CYBERSECURITY]: "Cybersecurity",
  [Category.DIGITAL_MARKETING]: "Digital Marketing",
  [Category.UI_UX_DESIGN]: "UI/UX Design",
  [Category.DATA_ENGINEERING]: "Data Engineering",
};

export enum Currency {
  USD = "USD",
  AUD = "AUD",
  SGD = "SGD",
  INR = "INR",
}

export enum TaskStatus {
  TODO = "TODO",
  STARTED = "STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export const TaskStatusLabelMap: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "To Do",
  [TaskStatus.STARTED]: "Started",
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.COMPLETED]: "Completed",
};

export enum MODAL_TYPE {
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

export const protectedRoutes = ["/dashboard", "/tasks", "/skills"];
export const unprotectedRoutes = ["/login", "/register"];

export const roleRouteAccessMap = {
  [ROLE.USER]: ["/dashboard", "/tasks"],
  [ROLE.PROVIDER]: ["/dashboard", "/skills"],
};
