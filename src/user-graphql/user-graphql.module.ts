import { Module } from '@nestjs/common';
import { UserGraphqlResolver } from './user-graphql.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [UserGraphqlResolver]
})
export class UserGraphqlModule {}
