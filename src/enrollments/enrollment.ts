import BaseModel from "../common/models/base";
import { Course } from "../courses/course";
import { User } from "../users/user";

export interface Enrollment extends BaseModel {
  owner: User;
  course: Course;
  courseId: number;
}
  