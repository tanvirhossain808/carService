/* eslint-disable prettier/prettier */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup(email: string, password: string) {
    //See if email is in use
    const user = await this.userService.find(email);

    if (user.length) {
      throw new BadRequestException('Email in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const newUser = await this.userService.create(email, result);
    console.log(newUser, 'new user');
    return newUser;
    //Hash the user password
    //Create a new user and save it
    //return the user
  }
  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }
}

//appsecret:4b07934bde365fe167760b0bbc655307
//appId:28087310540915685

// embadedurl:https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=28087310540915685&redirect_uri=https://31bc-103-165-93-85.ngrok-free.app/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish
// token:IGAGPJQpd8wZBVBZAE1XSC1OOC1Jc2hFNW5xWFE2QlBZAeDBkWVZAMLXpoOHFNNFpyR3d5T1U1ZADNiNzNocFJYdTJvU3hYTF9BUkpWMmhPZAVl0dzNGMmxRLVBqWkFPaS1raFJtN2lpdUc0RWRyU2UtOTY4WEl6T05lU2ktbXByanp1cwZDZD
