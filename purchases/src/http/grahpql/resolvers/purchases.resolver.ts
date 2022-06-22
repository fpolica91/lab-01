import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';
import { ProductsService } from 'src/services/product.service';
import { PurchaseService } from 'src/services/purchase.service';
import { CreatePruchase } from '../dto';
import { Purchase } from '../models/purchases';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private productsService: ProductsService,
    private purchaseService: PurchaseService,
    private customersService: CustomersService,
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

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Purchase)
  async createPurchase(
    @Args('data') data: CreatePruchase,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersService.getCustomerByAuth(user.sub);
    if (!customer) {
      customer = await this.customersService.createCustomer(user.sub);
    }
    const purchase = await this.purchaseService.createPurchase({
      customerId: customer.id,
      productId: data.productId,
    });
    return purchase;
  }
  // not seen
}
