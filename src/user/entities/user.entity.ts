import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty({example: '1', description: 'Id пользователя'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'admin', description: 'Логин пользователя'})
    @Column({
        unique: true
    })
    login: string;

    @ApiProperty({example: 'qwerty!', description: 'Пароль пользователя'})
    @Column()
    password: string;

    @ApiProperty({example: 'Иванов Иван Иванович', description: 'ФИО пользователя'})
    @Column()
    fio: string;

    @ApiProperty({example: '3ab193ce309464b80c8e3c2840a6dc062940f25980ae35bdccfb0d6cda0a7d66be2f4ee701c1e4e6cd15ed004e4e949569d3569c57e208ccf41530c764e92c7f', description: 'API Token пользователя'})
    @Column()
    apiToken: string;
}