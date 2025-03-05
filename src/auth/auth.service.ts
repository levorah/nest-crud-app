import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2"
import { AuthDto } from "./dto";

@Injectable({})

export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        // we need to generate hash for our pass
        const hashed = await argon.hash(dto.password);
        // then we need to save user data in db
        const { hash, ...user } = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hashed,
            },
        });

        // then we need return the saved user
        return user
    }
    login() {
        return "login success"
    }

}