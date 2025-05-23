/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // console.log(request, 'requestdfs');
    console.log(request.currentUser, 'request');
    return request.currentUser;
  },
);
