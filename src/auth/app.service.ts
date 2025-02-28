import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/app.service";

@Injectable({})

export class AuthService {
    constructor(private prisma:PrismaService){
        
    }
    login() {
        return "login success"
    }

    signup() {
        return "singup success"
    }
}