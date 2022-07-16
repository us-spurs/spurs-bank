import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthLoginDto, AuthRegisterDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
    @Post('register')
    async register(@Body() dto: AuthRegisterDto) {}

    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthLoginDto) {}
}
