import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-user-interceptors';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), UsersModule],
  controllers: [ReportsController],
  providers: [ReportsService, CurrentUserInterceptor],
})
export class ReportsModule {}
