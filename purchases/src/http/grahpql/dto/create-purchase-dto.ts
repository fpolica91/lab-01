import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePruchase {
  @Field()
  productId: string;
}
