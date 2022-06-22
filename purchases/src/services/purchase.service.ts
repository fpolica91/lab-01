import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.purchase.findMany();
  }
  async findFromUser(userId: string) {
    const purchases = await this.prisma.purchase.findMany({
      where: { customerId: userId },
    });
    return purchases;
  }

  async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const findProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!findProduct) {
      throw new Error('Product not found');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });
    return purchase;
  }
}
