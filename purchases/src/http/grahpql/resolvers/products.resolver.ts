import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from 'src/services/product.service';
import { CreateProductInput } from '../dto/create-product-dto';
import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  // @UseGuards(AuthorizationGuard)
  @Query(() => [Product])
  products() {
    return this.productsService.findAll();
  }

  @Mutation(() => Product)
  async createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
