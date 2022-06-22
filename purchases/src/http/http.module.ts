import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsResolver } from './grahpql/resolvers/products.resolver';
import { ProductsService } from 'src/services/product.service';
import { PurchasesResolver } from './grahpql/resolvers/purchases.resolver';
import { PurchaseService } from 'src/services/purchase.service';
import { CustomersService } from 'src/services/customers.service';
import { CustomerResolver } from './grahpql/resolvers/customer.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ProductsResolver,
    PurchasesResolver,
    CustomerResolver,

    CustomersService,
    ProductsService,
    PurchaseService,
  ],
})
export class HttpModule {}
