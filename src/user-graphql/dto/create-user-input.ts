import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, MinLength} from 'class-validator';
import { Role } from 'src/entities/enums/role.enum';

@InputType()
export class CreateUserInput {
  @IsString()
  @MinLength(1)
  @Field()
  name: string;

  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsEnum(Role)
  @Field(() => Role)
  role: Role;
}
