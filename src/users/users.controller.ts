/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseInterceptors,
  // UseInterceptors,
  // ClassSerializerInterceptor,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create_users.dtos';
import { UsersService } from './users.service';
import { UpdateUserTdo } from './dtos/update_user.dtos';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dtos';
import { AuthService } from './auth.service';
import { CurrentUser } from './decoratores/Current-user-decoratores';
import { CurrentUserInterceptor } from './interceptors/current-user-interceptors';
import { UserEntity } from './user.entity';

@Controller('auth')
@serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Get('/color')
  getColor(@Session() session: any) {
    return session.color;
  }
  @Get('colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    return (session.color = color);
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
    return [{ message: 'Logged out' }];
  }
  // @Get('/whoami')
  // async getUser(@Session() Session: any) {
  //   const user = await this.userService.findOne(Session.userId);
  //   return user;
  // }
  @Get('/whoami')
  async getUser(@CurrentUser() data: UserEntity) {
    const user = data;
    return user;
  }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('Handler is running');
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  @Get()
  getAllUser(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
  @Patch('/:id')
  UpdateUser(@Param('id') id: string, @Body() body: UpdateUserTdo) {
    return this.userService.update(parseInt(id), body);
  }
  // @Post()
}
