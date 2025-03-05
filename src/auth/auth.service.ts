import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2"
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})

export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        // we need to generate hash for our pass
        const hashed = await argon.hash(dto.password);
        try {

            // then we need to save user data in db
            const { hash, ...user } = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hashed,
                },
            });

            // then we need return the saved user
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    // This error code refrenece to we try to create a duplicate field which should be unique 
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }
    }
    login() {
        return "login success"
    }

}