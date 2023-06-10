import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaModule } from '../prisma/prisma.module'
import { TodosModule } from './todos/todos.module'

@Module({
    imports: [
        PrismaModule,
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
        }),
        TodosModule,
    ],
})
export class AppModule {}
