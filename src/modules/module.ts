import BaseModel from "../common/models/base";
import { Course } from "../courses/course";
import { User } from "../users/user";
import { Content } from "../contents/content";

export interface Module extends BaseModel {
  title: string;
  duration: number;
  courseId: number;
  course: Course;
  contents: Content[];
  owner: User;
  isPublished: boolean;
}
