import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async getCustomerByAuth(authId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { authUserId: authId },
    });
    return customer;
  }
  async createCustomer(authId: string) {
    const customer = await this.prisma.customer.create({
      data: {
        authUserId: authId,
      },
    });
    return customer;
  }
}
