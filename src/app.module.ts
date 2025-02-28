import { Module } from '@nestjs/common';
import { AuthModule } from './auth/app.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/app.bookmark';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
