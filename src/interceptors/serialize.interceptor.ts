/* eslint-disable prettier/prettier */
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { /* plainToClass, */ plainToInstance } from 'class-transformer';

interface classConstructor {
  new (...args: any[]): object;
}

export const serialize = (dto: classConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //Run something before a request is handled by the request handler
    // console.log('I am running before a the handler', context);
    return handler.handle().pipe(
      map((data: any) => {
        //run something before the response is sent out
        // console.log('I am running before response is sent out', data);
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
