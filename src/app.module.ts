import { Module } from '@nestjs/common';
import { AuthModule } from './auth/app.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/app.module';
import { PrismaModule } from './prisma/app.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule,PrismaModule],
})
export class AppModule {}
