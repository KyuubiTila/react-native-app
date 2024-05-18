import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
})
export class AppModule {}
