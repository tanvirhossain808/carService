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
  UseInterceptors,
  // UseInterceptors,
  // ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create_users.dtos';
import { UsersService } from './users.service';
import { UpdateUserTdo } from './dtos/update_user.dtos';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }
  // @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(SerializeInterceptor)
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
