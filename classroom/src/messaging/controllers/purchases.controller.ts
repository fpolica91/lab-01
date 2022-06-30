import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class PurchasesController {
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload() payload: any) {
    console.log('purchase created', payload);
  }
}
