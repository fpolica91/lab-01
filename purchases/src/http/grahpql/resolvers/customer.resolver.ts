import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';
import { PurchaseService } from 'src/services/purchase.service';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private purchaseService: PurchaseService,
    private customersService: CustomersService,
  ) {}

  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuth(user.sub);
  }
  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchaseService.findFromUser(customer.id);
  }
}
