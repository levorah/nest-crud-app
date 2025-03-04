
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>("JWT_SECRET") as string
        })
    }

    async validate(payload: { sub: number, email: string }) {
        console.log(payload)
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })
        if (!user)
            return null

        const { hash, ...userData } = user
        return userData
    }
}
