import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchases';

@ObjectType()
export class Customer {
  id: string;
  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
