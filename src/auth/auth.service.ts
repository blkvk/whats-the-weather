import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { signUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { signInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(signInDto: signInDto) {
        const user = await this.usersService.findUserByLogin(signInDto.login);
        if (!user || (user && !bcrypt.compare(user.password, signInDto.password))) {
            throw new UnauthorizedException({message: 'Incorrect login or password'})
        };
        const {id, login, password, ...result} = user;
        return result;
    }

    async signUp(signUpDto: signUpDto) {
        const isExists = await this.usersService.findUserByLogin(signUpDto.login);
        if (isExists) throw new BadRequestException('User with this login already exists');
        const pass = await bcrypt.hash(signUpDto.password, 5);
        const apiToken = await this.generateToken(signUpDto.login, signUpDto.fio)
        const user = await this.usersService.createUser({...signUpDto, password: pass}, apiToken);
        return user;
    }

    async generateToken(login:string, fio:string) {
        return this.jwtService.sign({login, fio});
    }

    async signIn(signInDto: signInDto) {
        const user = await this.validateUser(signInDto);
        return user;
    }

    async verify(token) {
        return !!await this.usersService.findUserByToken(token);
    }
}
