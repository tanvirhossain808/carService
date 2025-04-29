/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      find: (email) => {
        return Promise.resolve([
          {
            id: Math.floor(Math.random()),
            email,
          } as UserEntity,
        ]);
      },
      findOne: (id: number) => {
        return Promise.resolve(
          Math.floor(Math.random() * 10) % 2 === 0
            ? null
            : ({ id, email: 'test@example.com' } as UserEntity),
        );
      },
      // update: (id: number, attrs: Partial<UserEntity>) => {
      //   return Promise.resolve({ id, ...attrs } as UserEntity);
      // },
      // remove: (id: number) => {
      //   return Promise.resolve({ id } as UserEntity);
      // },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
