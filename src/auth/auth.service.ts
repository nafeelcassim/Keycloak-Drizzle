import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto/auth.dto';

import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { KeyCloakConfig } from './constants/constants';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly httpService: HttpService) {}

  async getPAT(platform: string) {
    const config = KeyCloakConfig[platform];
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'client_credentials');
    urlSearchParams.append('client_id', config.client_id);
    urlSearchParams.append('client_secret', config.client_secret);
    const res = await firstValueFrom(
      this.httpService
        .post(
          'http://localhost:8080/realms/nestjs-tutorial/protocol/openid-connect/token',
          urlSearchParams,
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
    const res = await this.getPAT(registerDto.platform);
    const createUserRes = await firstValueFrom(
      this.httpService
        .post(
          'http://localhost:8080/admin/realms/nestjs-tutorial/users',
          {
            username: registerDto.email,
            email: registerDto.email,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            enabled: true,
            emailVerified: true,
            credentials: [
              {
                type: 'password',
                value: registerDto.password,
                temporary: false,
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
            this.logger.error(
              `Keycloak API Error: ${JSON.stringify(error.response?.data || error.message)}`,
            );

            throw new BadRequestException('Something went wrong');
          }),
        ),
    );

    return createUserRes.data;
  }

  async updateUser(updateUser: UpdateUserDto, userId: string) {
    const res = await this.getPAT(updateUser.platform);
    const updatedUserRes = await firstValueFrom(
      this.httpService
        .put(
          `http://localhost:8080/admin/realms/nestjs-tutorial/users/${userId}`,
          {
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
          },
          {
            headers: {
              Authorization: `Bearer ${res}`,
            },
          },
        )
        .pipe(
          catchError((error) => {
            this.logger.error(
              `Keycloak API Error: ${JSON.stringify(error.response?.data || error.message)}`,
            );

            throw new BadRequestException('Something went wrong');
          }),
        ),
    );

    return updatedUserRes.data;
  }

  async createUser() {}

  async getAllUsers() {
    //TODO: Normally this will come in headers this is just experimenting
    const res = await this.getPAT('admin');
    const usersList = await firstValueFrom(
      this.httpService
        .get(`http://localhost:8080/admin/realms/nestjs-tutorial/users`, {
          headers: {
            Authorization: `Bearer ${res}`,
          },
        })
        .pipe(
          catchError((error) => {
            this.logger.error(
              `Keycloak API Error: ${JSON.stringify(error.response?.data || error.message)}`,
            );

            throw new BadRequestException('Something went wrong');
          }),
        ),
    );

    return usersList.data;
  }

  async changePassword() {}
}
