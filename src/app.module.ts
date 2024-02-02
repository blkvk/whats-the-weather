import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [__dirname + '/**/*.entity{.js, .ts}'],
            synchronize: true,
            namingStrategy: new SnakeNamingStrategy()
          }),
        UsersModule,
        AuthModule,
        WeatherModule,
        HttpModule.registerAsync({
          useFactory: () => ({
            timeout: 120000,
            maxRedirects: 5,
          }),
        }),
        HttpModule
  ]})
export class AppModule {}