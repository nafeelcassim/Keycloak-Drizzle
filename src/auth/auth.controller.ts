import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto/auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post('/login')
  loginUser(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @ApiBody({ type: RegisterDto })
  @Post('/register')
  registerUser(@Body() body: RegisterDto) {
    return this.authService.registerUser(body);
  }

  @ApiBody({ type: UpdateUserDto })
  @Post('/user/:id')
  updateUser(@Body() body: UpdateUserDto, @Param('id') userId: string) {
    return this.authService.updateUser(body, userId);
  }

  @Get('/user')
  getUsers() {
    return this.authService.getAllUsers();
  }

  @Get('/roles')
  getRoles() {
    return this.authService.getRoles();
  }

  @Get('roles/:name')
  async getRoleByName(@Param('name') name: string) {
    return await this.authService.getRoleByName(name);
  }

  @Get('credentials/:userId')
  async getCredentials(@Param('userId') userId: string) {
    return await this.authService.getCredentials(userId);
  }

  @Patch('/roles/:roleName/:userId')
  async mapRoleToUser(
    @Param('roleName') roleName: string,
    @Param('userId') userId: string,
  ) {
    return await this.authService.assignRoleToUser(userId, roleName);
  }
}
