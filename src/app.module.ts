import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { UserGraphqlModule } from './user-graphql/user-graphql.module';
import { UsersService } from './users/users.service';
import DataLoader from 'dataloader';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [UsersModule],
      inject: [UsersService],
      driver: ApolloDriver,
      useFactory: (store: UsersService) => ({
        // code first
        autoSchemaFile: true,
        debug: true,
        // enable playground ux
        playground: true,
        context: () => ({
          loaders: {
            postsByUser: new DataLoader<number, Post[]>(
              async (userIds) => store.batchPostsByUsers(userIds)
            ),
          },
        }),
      }),
    }),
    UserGraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
