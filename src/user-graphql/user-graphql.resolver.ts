import { Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Post } from 'src/entities/post.entity';
import DataLoader from 'dataloader';

@Resolver(() => User)
export class UserGraphqlResolver {
  constructor(private readonly usersService: UsersService) {}


  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @ResolveField(() => [Post])
  posts(
    @Parent() user: User,
    @Context('loaders')
    loaders: { postsByUser: DataLoader<number, Post[]> },
  ) {
    return loaders.postsByUser.load(user.id);
  }
}
