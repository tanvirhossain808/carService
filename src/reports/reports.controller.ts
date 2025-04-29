/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-reports-dto';
import { ReportsService } from './reports.service';
import { AuthGurd } from 'src/gurds/gurd-auth';
import { CurrentUser } from 'src/users/decoratores/Current-user-decoratores';
import { UserEntity } from 'src/users/user.entity';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-user-interceptors';
import { ReportDto } from './dtos/reports-dto';
import { serialize } from 'src/interceptors/serialize.interceptor';

@Controller('reports')
@UseInterceptors(CurrentUserInterceptor)
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGurd)
  @serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
    return this.reportService.create(body, user);
  }
}
