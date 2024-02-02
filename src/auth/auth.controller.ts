import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sign-in.dto';
import { signUpDto } from './dto/sign-up.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @ApiOperation({summary: 'Авторизация'})
    @ApiOkResponse({type: User})
    @ApiUnauthorizedResponse({description: 'Incorrect login or password'})
    @Post('/sign-in')
    async signIn(@Body() signInDto: signInDto){
        return this.authService.validateUser(signInDto)
    }

    @ApiOperation({summary: 'Регистрация'})
    @ApiOkResponse({status: 200, type: User})
    @ApiBadRequestResponse({description: 'Login must have at least 4 characters\n\nPassword must have at least 6 characters\n\nPassword must inlude at least 1 of the characters: . , ! _\n\nFIO must have at least 2 characters'})
    @Post('/sign-up')
    @UsePipes(new ValidationPipe())
    async signUp(@Body() signUpDto: signUpDto) {
        return this.authService.signUp(signUpDto)
    }
}
