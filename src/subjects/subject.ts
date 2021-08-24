import BaseModel from "../common/models/base";
import { Course } from "../courses/course";
import { User } from "../users/user";

export interface Subject extends BaseModel {
  title: string;
  owner: User;
  courses: Course[];
  isPublished: boolean;
}
