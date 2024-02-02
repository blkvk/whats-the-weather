import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({})
export class WeatherLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, {nullable: false})
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @Column()
    actionTime: number;

    @Column()
    requestResult: number;

    @Column({
        nullable: true
    })
    tempC: number;
}