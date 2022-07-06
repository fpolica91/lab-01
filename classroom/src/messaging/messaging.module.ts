import { Module } from '@nestjs/common';
import { CoursesService } from '../services/courses.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { StudentsService } from '../services/students.service';
import { PurchasesController } from './controllers/purchases.controller';

@Module({
  controllers: [PurchasesController],
  providers: [StudentsService, CoursesService, EnrollmentsService],
})
export class MessagingModule {}
