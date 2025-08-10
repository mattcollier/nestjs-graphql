## Attribution
Thanks to `gitdagray` for initial skeleton for this project: https://github.com/gitdagray/nestjs-course. The graphql implementation was inspired by: https://github.com/vahid-nejad/nestjs-graphql-course.

## Description
The initial skeleton provides REST endpoints for doing CRUD operations on `users` which is an in memory list of users and their attributes.

### TODO:
- [ x ] Incorporate a GraphQL interface.
- [ x ] Implement a parent child relationship with an in-memor `posts` collection.
- [ x ] Implement a dataloader to optimize retrieval of user posts.

### Objectives Met
Access the GraphQL Playground at http://localhost:3000/graphql

The graphql API can now satisfy the following queries:
```
# users corresponds to the name given to the "findAll" resolver
{users {id, name, email, role}}

# with posts
{users {id, name, email, role, posts {content}}}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
