import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

enum PurchasesStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchasesStatus, {
  name: 'PurchasesStatus',
  description: 'available purchases status',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchasesStatus)
  status: PurchasesStatus;

  @Field()
  slug: string;

  @Field(() => Date)
  createdAt: Date;
}
