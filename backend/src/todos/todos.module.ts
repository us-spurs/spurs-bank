import { Module } from '@nestjs/common'
import { TodosResolver } from './todos.resolver'
import { TodosService } from './todos.service'
import { PrismaModule } from '../../prisma/prisma.module'

@Module({
    imports: [PrismaModule],
    providers: [TodosResolver, TodosService],
})
export class TodosModule {}
