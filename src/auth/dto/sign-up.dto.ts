import { ApiProperty } from '@nestjs/swagger';
import { Matches, MinLength } from 'class-validator';

export class signUpDto {
    @ApiProperty({example: 'admin', description: 'Логин пользователя'})
    @MinLength(4, {message: 'Login must have at least 4 characters'})
    login: string;

    @ApiProperty({example: 'qwerty!', description: 'Пароль пользователя'})
    @MinLength(6, {message: 'Password must have at least 6 characters'})
    @Matches(/,|\.|!|_/, {message: 'Password must inlude at least 1 of the characters: . , ! _'})
    password: string;

    @ApiProperty({example: 'Иванов Иван Иванович', description: 'ФИО пользователя'})
    @MinLength(2, {message: 'FIO must have at least 2 characters'})
    fio: string;
}