/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-reports-dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(reportDto: CreateReportDto, user: UserEntity) {
    const report = this.repo.create(reportDto);
    // report.user = user; // Assign the user to the report
    // report.user = user; // Assign the user to the report
    console.log(user, 'user from report service');
    report.user = user; // Assign the user to the report
    return this.repo.save(report);
  }
}
