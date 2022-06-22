import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchases';

@ObjectType()
export class Customer {
  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
