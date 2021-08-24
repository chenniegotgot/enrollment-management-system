import BaseModel from "../common/models/base";
import { Module } from "../modules/module";
import { User } from "../users/user";

export interface Content extends BaseModel {
  content: string;
  type: string;
  moduleId: number;
  owner: User;
  module: Module;
  isPublished: boolean;
}
