import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Subject } from "../entities/subject.entity";
import { Course } from "../entities/course.entity";
import { User } from "../entities/user.entity";
import { Actions } from "../common/enums/actions";
import { ModuleEntity } from "../entities/module.entity";
import { Content } from "../entities/content.entity";
import { Enrollment } from "../entities/enrollment.entity"; 
import { Roles } from "../common/enums/roles";

type Subjects = InferSubjects<
                  typeof Course | 
                  typeof User | 
                  typeof Subject | 
                  typeof ModuleEntity | 
                  typeof Content | 
                  typeof Enrollment
                > | 
                  'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  userAbilityFor(user: User) {
    const { can, cannot, build } = new AbilityBuilder<Ability<[Actions, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.role === Roles.ADMIN) { // PERMISSIONS FOR ADMINS
      // read-write access to everything
      can(Actions.MANAGE, 'all'); 
    } else if (user.role === Roles.INSTRUCTOR) { // PERMISSIONS FOR INSTRUCTORS
      // read-only access to published entities
      can(Actions.READ, 'all', { isPublished: true });
      // read-only access to unpublished and owned entities
      can(Actions.READ, 'all', { isPublished: false, userId: user.id });
      // no access to Admin's data
      cannot(Actions.READ, User, { role: Roles.ADMIN });
      // can create any entities
      can(Actions.CREATE, 'all');
      // cannot enroll to a course
      cannot(Actions.CREATE, Enrollment);
      // can update its own entities
      can(Actions.UPDATE, 'all', { userId: user.id });
      // can only update its own profile
      can(Actions.UPDATE, User, { id: user.id });
      // can only delete unpublished and owned entities
      can(Actions.DELETE, 'all', { isPublished: false, userId: user.id });
    } else { // PERMISSIONS FOR STUDENTS
      // read-only access to published entities
      can(Actions.READ, 'all', { isPublished: true });
      // read-only access to enrolled courses
      can(Actions.READ, Enrollment, { userId: user.id });
      // can enroll to any courses
      can(Actions.CREATE, Enrollment);
      // can only update its own enrollment
      can(Actions.UPDATE, Enrollment, { userId: user.id });
    }

    return build({
      detectSubjectType: item =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
