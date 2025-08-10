import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    // export service so it can be used in `user-graphql` module
    exports: [UsersService]
})
export class UsersModule { }
