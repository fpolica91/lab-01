import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';
export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchasesController {
  constructor(
    private studentService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentService: EnrollmentsService,
  ) {}
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    let student = await this.studentService.getStudentByAuthUserId(
      payload.customer.authUserId,
    );
    if (!student) {
      student = await this.studentService.createStudent({
        authUserId: payload.customer.authUserId,
      });
    }
    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug,
    );
    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      });
    }
    await this.enrollmentService.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
