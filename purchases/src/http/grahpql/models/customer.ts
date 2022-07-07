import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from './purchases';

@ObjectType('User')
/**
 * important Directive must have the common key
 * between the model in the purchases and classroom db
 */
@Directive('@key(fields: "authUserId")')
export class Customer {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
