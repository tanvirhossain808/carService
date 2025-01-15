/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { UserEntity } from './users/user.entity';
import { ReportEntity } from './reports/report.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'your_password',
      database: 'db.sqlite',
      entities: [UserEntity, ReportEntity],
      synchronize: true,
    }),
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
