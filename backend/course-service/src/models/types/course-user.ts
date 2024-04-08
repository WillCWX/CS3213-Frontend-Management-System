import { Course } from "./course";

export enum UserType {
  Student,
  Tutor,
  Professor,
  Administrator,
}

export interface CourseUser extends Course {
  type: string;
}
