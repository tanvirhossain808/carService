/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  beforeEach(async () => {
    const users: UserEntity[] = [];
    fakeUserService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const newUser = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as UserEntity;
        users.push(newUser);
        return Promise.resolve(newUser);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });
  it('cah create and instance of auth service', async () => {
    //create a fake copy of user service

    expect(service).toBeDefined();
  });
  it('It created user with salted and hashed password', async () => {
    const user = await service.signup('a@a.com', 'passowrd');
    expect(user.password).not.toEqual('passowrd');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
  it('Throws and errors if user signup with email that is in use', async () => {
    await service.signup('a@a.com', 'password');
    // fakeUserService.find = () =>
    //   Promise.resolve([
    //     { id: 1, password: 'password', email: 'a@a.com' } as UserEntity,
    //   ]);
    await expect(service.signup('a@a.com', 'password')).rejects.toThrow(
      BadRequestException,
    );
  });
  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('a@a.com', 'passdflkj')).rejects.toThrow(
      NotFoundException,
    );
  });
  it('it throws an error if an invalid password is provided', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        { id: 1, password: '33', email: 'a@a.com' } as UserEntity,
      ]);
    await expect(service.signin('a@a.com', 'passdflkj')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('it return the user if correct password is provided', async () => {
    await service.signup('t@t.com', 'password');
    const user = await service.signin('t@t.com', 'password');
    // return Promise.resolve(user);
    // Promise.resolve([
    //   {
    //     id: 1,
    //     password:
    //       'b35db9be3613c788.be0e5b1e408c64c57c7cea219a0feb08d1aa94e932c6404682746e2ee58d0aff',
    //     email: 'ds@a.com',
    //   } as UserEntity,
    // ]);
    // const user = await service.signin('a@a.com', 'myPassword');
    expect(user).toBeDefined();

    // const user = await service.signup('a@a.com', 'myPassword');
    // console.log(user, 'users');
  });
  // it('Throws an error if user signs up with an email that is already in use', async () => {
  //   fakeUserService.find = () =>
  //     Promise.resolve([
  //       { id: 1, password: 'password', email: 'a@a.com' } as UserEntity,
  //     ]);

  //   await expect(service.signin('a@a.com', 'password')).rejects.toThrow(
  //     UnauthorizedException,
  //   );
  // });
});
