import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { signUpDto } from 'src/auth/dto/sign-up.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    async createUser(signUpDto: signUpDto, apiToken: string) {
        const user = await this.usersRepository.save({
            login: signUpDto.login,
            password: signUpDto.password,
            fio: signUpDto.fio,
            apiToken: apiToken
        });
        return user;
    }

    async findUserByLogin(login: string) {
        const user = await this.usersRepository.findOne({
            where: {login}
        });
        return user;
    }

    async findUserByToken(apiToken: string) {
        const user = await this.usersRepository.findOne({
            where: {apiToken}
        });
        return user;
    }
}
