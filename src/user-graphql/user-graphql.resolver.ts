import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(() => User)
export class UserGraphqlResolver {
  constructor(private readonly usersService: UsersService) {}


  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.usersService.findAll();
  }
}
