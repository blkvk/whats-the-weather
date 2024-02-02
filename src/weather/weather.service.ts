import { Injectable } from '@nestjs/common';
import { getWeatherDto } from './dto/get-weather.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UsersService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherLog } from './entities/weather-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeatherService {
    constructor(private httpService: HttpService,
                private userService: UsersService,
                @InjectRepository(WeatherLog) private weatherLogRepository: Repository<WeatherLog>) {}

    async getCurrentWeather(getWeatherDto: getWeatherDto) {
        const token = process.env.WEATHER_TOKEN;
        try {
            const result = await firstValueFrom(this.httpService.get('https://api.weatherapi.com/v1/current.json', {params: {q: getWeatherDto.city, key: token, lang: getWeatherDto.language}}))
            await this.logWeather(getWeatherDto.apiToken, result.data?.current?.temp_c, result.status);
            return result.data;
        } catch(e) {
            await this.logWeather(getWeatherDto.apiToken, null, e.response.status);
            return e;
        }
    }

    async logWeather(apiToken, tempC, status) {
        const user = await this.userService.findUserByToken(apiToken);
        const actionTime = Math.floor(Date.now() / 1000);
        await this.weatherLogRepository.save({
            user: {id: user.id}, 
            actionTime, 
            tempC, 
            requestResult: status
        });
        return;
    }
}
