import {
  Body,
  Controller,
  Post,
  Patch,
  Param,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from './entities/auth.entity';

import { AuthService } from './auth.service';
import {
  CreateUserDto,
  LoginUserDto,
  RegisterFullDto,
  UpdateUserDto,
} from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'User was create', type: User })
  @ApiResponse({
    status: 400,
    description: 'Bad request (user already exists)',
  })
  @Post('register')
  createUser(@Body() registerFull: RegisterFullDto) {
    return this.authService.registerFull(registerFull);
  }

  @Post('login')
  loginUser(@Body() userLogin: LoginUserDto) {
    return this.authService.login(userLogin);
  }

  @Patch('update/:id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.authService.updateUser(id, user)
  }

  // @ApiResponse({ status: 201, description: 'User was logged', type: User })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Bad request (email or password are wrong)',
  // })
  // @Post('login')
  // loginUser(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.login(loginUserDto);
  // }

  // @ApiResponse({ status: 201, description: 'User updated!', type: User })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Bad request (data are wrong)',
  // })
  // @Patch('update/:id')
  // updateUser(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateUserDto: UpdateAuthDto,
  // ) {
  //   return this.authService.update(id, updateUserDto);
  // }

  // @ApiResponse({ status: 201, description: 'Check your email', type: User })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Bad request (email not found)',
  // })
  // @Post('forgot')
  // forgotPassword(@Body('email') email: string) {
  //   return this.authService.forgot(email);
  // }

  // @ApiResponse({
  //   status: 201,
  //   description: 'Password changed successfully',
  //   type: User,
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Bad request ()',
  // })
  // @Post('reset/:token')
  // resetPassword(
  //   @Param('token') token: string,
  //   @Body('password') password: string,
  //   @Body('confirmed_password') confirmed_password: string,
  // ) {
  //   return this.authService.reset(token, password, confirmed_password);
  // }
}
