import { ApiProperty } from '@nestjs/swagger';

export class signInDto {

    @ApiProperty({example: 'admin', description: 'Логин пользователя'})
    login: string;

    @ApiProperty({example: 'qwerty!', description: 'Пароль пользователя'})
    password: string;
}