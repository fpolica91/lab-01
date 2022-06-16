import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async createProduct(product) {
    const slug = slugify(product.title, { lower: true });
    const productExists = await this.prisma.product.findUnique({
      where: { slug },
    });
    if (productExists) {
      throw new Error('Product already exists');
    }

    const prod = await this.prisma.product.create({
      data: {
        slug,
        title: product.title,
      },
    });
    return prod;
  }
}
