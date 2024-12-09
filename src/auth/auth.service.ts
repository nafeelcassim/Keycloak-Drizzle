import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { KeyCloakConfig } from './constants/constants';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly httpService: HttpService) {}

  async getPAT(platform: string) {
    const res = await firstValueFrom(
      this.httpService
        .post(
          'http://localhost:8080/realms/nestjs-tutorial/protocol/openid-connect/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
            scope: 'openid',
            ...KeyCloakConfig[platform],
          }),
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error);
            throw new BadRequestException('Invalid credentials');
          }),
        ),
    );

    const { access_token } = res.data;
    return access_token;
  }

  async login(loginDto: LoginDto) {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const res = await firstValueFrom(
      this.httpService
        .post(
          'http://localhost:8080/realms/nestjs-tutorial/protocol/openid-connect/token',
          new URLSearchParams({
            username: loginDto.username,
            password: loginDto.password,
            grant_type: 'password',
            scope: 'openid',
            ...KeyCloakConfig[loginDto.platform],
          }),
          { headers },
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error);
            throw new BadRequestException('Invalid credentials');
          }),
        ),
    );

    return res.data;
  }

  async registerUser(registerDto: RegisterDto) {
    const res = this.getPAT(registerDto.platform);

    const createUserRes = await firstValueFrom(
      this.httpService
        .post(
          'http://localhost:8080/admin/realms/nestjs-tutorial/users',
          {
            username: registerDto.email,
            email: registerDto.email,
            enabled: true,
            emailVerified: true,
            credentials: [
              {
                type: 'password',
                value: registerDto.password,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${res}`,
            },
          },
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error);
            throw new BadRequestException('Something went wrong');
          }),
        ),
    );

    return createUserRes.data;
  }

  async createUser() {}

  async getAllUsers() {}

  async changePassword() {}
}
