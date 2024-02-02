import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class getWeatherDto {
    @ApiProperty({example: '3ab193ce309464b80c8e3c2840a6dc062940f25980ae35bdccfb0d6cda0a7d66be2f4ee701c1e4e6cd15ed004e4e949569d3569c57e208ccf41530c764e92c7f', description: 'API Token пользователя'})
    apiToken: string;

    @ApiProperty({example: 'moscow', description: 'Город'})
    city: string;

    @ApiPropertyOptional({example: 'ru', description: 'Язык ответа'})
    @IsString()
    @IsOptional()
    language?: string = 'ru';
}