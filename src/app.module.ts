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
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { Role } from './entities/enums/role.enum';

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
        formatError: (formatted: GraphQLFormattedError, error: unknown) => {
          const e = error as GraphQLError;
          const msg = e.message || formatted.message;
          if (msg.includes('does not exist in "Role" enum')) {
            const allowed = Object.values(Role);
            return {
              ...formatted,
              message: `Invalid value for "role". Allowed values: ${allowed.join(', ')}`,
              extensions: {
                ...formatted.extensions,
                code: 'BAD_USER_INPUT',
                field: 'role',
                allowedValues: allowed,
              },
            };
          }
          return formatted;
        },
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
