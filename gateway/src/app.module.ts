import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'classroom', url: 'http://localhost:3333/graphql' },
            { name: 'purchases', url: 'http://localhost:3334/graphql' },
          ],
        }),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
