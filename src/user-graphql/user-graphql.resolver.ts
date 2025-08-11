import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user-input';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Post } from '../entities/post.entity';
import DataLoader from 'dataloader';

@Resolver(() => User)
export class UserGraphqlResolver {
  constructor(private readonly usersService: UsersService) {}


  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @ResolveField(() => [Post])
  posts(
    @Parent() user: User,
    @Context('loaders')
    loaders: { postsByUser: DataLoader<number, Post[]> },
  ) {
    return loaders.postsByUser.load(user.id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
