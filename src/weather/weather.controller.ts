import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { getWeatherDto } from './dto/get-weather.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Сервис погоды')
@Controller('weather')
export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    @ApiOperation({summary: 'Получение текущей погоды'})
    @ApiOkResponse({schema: {
      example: {
        "location": {
            "name": "Moscow",
            "region": "Moscow City",
            "country": "Russia",
            "lat": 55.75,
            "lon": 37.62,
            "tz_id": "Europe/Moscow",
            "localtime_epoch": 1706826546,
            "localtime": "2024-02-02 1:29"
        },
        "current": {
            "last_updated_epoch": 1706825700,
            "last_updated": "2024-02-02 01:15",
            "temp_c": 0,
            "temp_f": 32,
            "is_day": 0,
            "condition": {
                "text": "Небольшой снег",
                "icon": "//cdn.weatherapi.com/weather/64x64/night/368.png",
                "code": 1255
            },
            "wind_mph": 9.4,
            "wind_kph": 15.1,
            "wind_degree": 240,
            "wind_dir": "WSW",
            "pressure_mb": 997,
            "pressure_in": 29.44,
            "precip_mm": 0,
            "precip_in": 0,
            "humidity": 93,
            "cloud": 75,
            "feelslike_c": -4.6,
            "feelslike_f": 23.8,
            "vis_km": 3.8,
            "vis_miles": 2,
            "uv": 1,
            "gust_mph": 15.5,
            "gust_kph": 24.9
    }}
    },})
    @ApiUnauthorizedResponse({description: 'User is not authorized'})
    @Post('')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({transform: true}))
    async getCurrentWeather(@Body() weatherDto: getWeatherDto) {
        return await this.weatherService.getCurrentWeather(weatherDto);
    }
}
