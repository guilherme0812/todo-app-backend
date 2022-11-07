import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/app/user/entities/user.entity';
import { UserService } from 'src/app/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jtwService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };

    return {token: this.jtwService.sign(payload)}
  }

  async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.userService.findOneOrFail({ where: { email } });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
