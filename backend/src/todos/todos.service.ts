import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../graphql.schema';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';




@Injectable()
export class TodosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async findOne(id: string): Promise<Todo> {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  async create(data: CreateTodoInput): Promise<Todo> {
    const todo = await this.prisma.todo.create({ data });
    await this.elasticsearchService.createDocument(todo);
    return todo;
  }

  async update(data: UpdateTodoInput): Promise<Todo> {
    const { id, ...rest } = data;
    return this.prisma.todo.update({ where: { id }, data: rest });
  }

  async delete(id: string): Promise<Todo> {
    return this.prisma.todo.delete({ where: { id } });
  }
}
