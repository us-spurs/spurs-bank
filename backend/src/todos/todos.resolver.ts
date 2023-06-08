import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../graphql.schema';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Query(() => Todo)
  async todo(@Args('id', { type: () => ID }) id: string): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('data') data: CreateTodoInput,
  ): Promise<Todo> {
    return this.todosService.create(data);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('data') data: UpdateTodoInput,
  ): Promise<Todo> {
    return this.todosService.update(data);
  }

  @Mutation(() => Todo)
  async deleteTodo(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Todo> {
    return this.todosService.delete(id);
  }
}
