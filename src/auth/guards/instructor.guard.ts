import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  
  @Injectable()
  export class InstructorGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (user.role == 'instructor') {
        return true;
      }
  
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
  