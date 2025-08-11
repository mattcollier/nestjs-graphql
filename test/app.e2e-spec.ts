import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('GrpahQL API', () => {
    it('Gets all users', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({"query":"query GetUsers { users { id name email role } }"})
        .set('Accept', 'application/json');
      expect(response.body.data).toHaveProperty('users');
      // expect the 5 mock users in the in-memory collection
      expect(response.body.data.users).toHaveLength(5);
    });

    it('Successfully creates a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({"query":'mutation {createUser(createUserInput: {  email: "alice@example.com", role: ADMIN, name: "alice" }) {name role email id}}'})
        .set('Accept', 'application/json');
      expect(response.body.data).toHaveProperty('createUser');
      const {createUser} = response.body.data;
      expect(createUser).toHaveProperty("id");
      expect(createUser).toHaveProperty("email");
      expect(createUser).toHaveProperty("role");
      expect(createUser).toHaveProperty("name");
      expect(createUser.name).toStrictEqual("alice");
    });

    it('Receives an error on an invalid role value', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({"query":'mutation {createUser(createUserInput: {  email: "adam@example.com", role: SUPERUSER, name: "adam" }) {name role email id}}'})
        .set('Accept', 'application/json');
      console.log(response.body);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toHaveLength(1);
      const [error] = response.body.errors;
      // check for custom error handling
      expect(error.message).toContain('Allowed values: ADMIN, ENGINEER, USER, INTERN');
    });
  })
});
