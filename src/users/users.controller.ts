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
import {
  serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dtos';
import { AuthService } from './auth.service';

@Controller('auth')
@serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Get('colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    return (session.color = color);
  }
  @Get('/color')
  getColor(@Session() session: any) {
    return session.color;
  }
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }
  @Post('signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
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
