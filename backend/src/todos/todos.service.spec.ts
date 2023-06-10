import { Test } from '@nestjs/testing'
import { TodosService } from './todos.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('TodosService', () => {
    let todosService: TodosService
    let prismaService: PrismaService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                TodosService,
                {
                    provide: PrismaService,
                    useValue: {
                        todo: {
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            create: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                        },
                    },
                },
            ],
        }).compile()

        todosService = moduleRef.get<TodosService>(TodosService)
        prismaService = moduleRef.get<PrismaService>(PrismaService)
    })

    describe('findAll', () => {
        it('should return an array of todos', async () => {
            const expectedResult = [{ id: '1', title: 'Test Todo', description: 'Test Description' }]
            jest.spyOn(prismaService.todo, 'findMany').mockResolvedValue(expectedResult)

            const result = await todosService.findAll()

            expect(result).toEqual(expectedResult)
        })
    })

    // Add more test cases for other CRUD operations (findOne, create, update, delete)
})
