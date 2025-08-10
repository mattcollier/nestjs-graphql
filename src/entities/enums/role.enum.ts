import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  ENGINEER = 'ENGINEER',
  USER = 'USER',
  INTERN = 'INTERN'
}

registerEnumType(Role, { name: 'Role' });
