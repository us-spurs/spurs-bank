import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Todo {
    @Field(() => ID)
    id: string

    @Field()
    title: string

    @Field({ nullable: true })
    description?: string
}

@ObjectType()
export class CreateTodoInput {
    @Field()
    title: string

    @Field({ nullable: true })
    description?: string
}

@ObjectType()
export class UpdateTodoInput {
    @Field(() => ID)
    id: string

    @Field({ nullable: true })
    title?: string

    @Field({ nullable: true })
    description?: string
}
