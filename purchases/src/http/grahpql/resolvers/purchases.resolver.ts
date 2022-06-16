import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ProductsService } from 'src/services/product.service';
import { PurchaseService } from 'src/services/purchase.service';
import { Purchase } from '../models/purchases';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private productsService: ProductsService,
    private purchaseService: PurchaseService,
  ) {}

  // @UseGuards(AuthorizationGuard)
  @Query(() => [Purchase])
  purchases() {
    return this.purchaseService.findAll();
  }
  @ResolveField()
  async product(@Parent() purchase: Purchase) {
    return this.productsService.findById(purchase.productId);
  }
}
