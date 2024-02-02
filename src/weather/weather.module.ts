import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { WeatherLog } from './entities/weather-log.entity';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/user/user.module';

@Module({
    imports: [AuthModule, JwtModule, TypeOrmModule.forFeature([WeatherLog]), HttpModule, UsersModule],
    providers: [WeatherService],
    controllers: [WeatherController]
})
export class WeatherModule {}
