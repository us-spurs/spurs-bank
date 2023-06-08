import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { Todo } from '@/graphql.schema';

describe('Todos (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let createdTodo: Todo;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  it('should create a new todo', async () => {
    const { mutate } = createTestClient(await app.init());
    const CREATE_TODO = gql`
        mutation {
            createTodo(
                input: {
                    title: "Test Todo"
                    description: "Test Description"
                }
            ) {
                id
                title
                description
            }
        }
    `;

    const { data, errors } = await mutate({ mutation: CREATE_TODO });

    expect(errors).toBeUndefined();
    expect(data.createTodo).toHaveProperty('id');
    expect(data.createTodo.title).toBe('Test Todo');
    expect(data.createTodo.description).toBe('Test Description');

    createdTodo = data.createTodo;
  });

  it('should retrieve the created todo', async () => {
    const { query } = createTestClient(await app.init());
    const GET_TODO = gql`
        query($id: ID!) {
            todo(id: $id) {
                id
                title
                description
            }
        }
    `;

    const { data, errors } = await query({
      query: GET_TODO,
      variables: { id: createdTodo.id },
    });

    expect(errors).toBeUndefined();
    expect(data.todo).toEqual(createdTodo);
  });

  it('should update the created todo', async () => {
    const { mutate } = createTestClient(await app.init());
    const UPDATE_TODO = gql`
        mutation($id: ID!) {
            updateTodo(
                input: {
                    id: $id
                    title: "Updated Test Todo"
                    description: "Updated Test Description"
                }
            ) {
                id
                title
                description
            }
        }
    `;

    const { data, errors } = await mutate({
      mutation: UPDATE_TODO,
      variables: { id: createdTodo.id },
    });

    expect(errors).toBeUndefined();
    expect(data.updateTodo).toHaveProperty('id');
    expect(data.updateTodo.title).toBe('Updated Test Todo');
    expect(data.updateTodo.description).toBe('Updated Test Description');
  });

  it('should delete the created todo', async () => {
    const { mutate } = createTestClient(await app.init());
    const DELETE_TODO = gql`
        mutation($id: ID!) {
            deleteTodo(id: $id)
        }
    `;

    const { data, errors } = await mutate({
      mutation: DELETE_TODO,
      variables: { id: createdTodo.id },
    });

    expect(errors).toBeUndefined();
    expect(data.deleteTodo).toBe(true);
  });
});
