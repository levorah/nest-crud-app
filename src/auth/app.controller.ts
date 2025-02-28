import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./app.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Post('login')
    login() {
        return this.authService.login()
    }
    signup() {
        return this.authService.signup()
    }
}