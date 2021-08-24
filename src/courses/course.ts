import BaseModel from "../common/models/base";
import { Module } from "../modules/module";
import { Subject } from "../subjects/subject";
import { User } from "../users/user";

export interface Course extends BaseModel {
  title: string;
  author: string;
  description: string;
  icon: string;
  subjectId: number;
  owner: User;
  subject: Subject;
  modules: Module[];
  isPublished: boolean;
}
