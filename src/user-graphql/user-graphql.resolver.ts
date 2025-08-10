import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Post } from 'src/entities/post.entity';

@Resolver(() => User)
export class UserGraphqlResolver {
  constructor(private readonly usersService: UsersService) {}


  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @ResolveField(() => [Post])
  posts(@Parent() user: User) {
    return this.usersService.getPostsForUser(user.id);
  }
}
