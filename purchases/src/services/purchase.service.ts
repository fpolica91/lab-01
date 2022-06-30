import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { KafkaService } from 'src/messaging/kafka.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchaseService {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly prisma: PrismaService,
  ) {}

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
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    this.kafkaService.emit('purchases.new-purchase', {
      id: product.id,
      name: product.title,
      customer: {
        authUserId: customer.authUserId,
      },
    });
    return purchase;
  }
}
