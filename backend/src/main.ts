import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from '../prisma/prisma.service'
import { GraphQLSchemaBuilderModule } from '@nestjs/graphql'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const prismaService: PrismaService = app.get(PrismaService)
    prismaService.enableShutdownHooks(app)

    app.useGlobalPipes(new ValidationPipe())

    const gqlSchemaBuilder = app.get(GraphQLSchemaBuilderModule)
    gqlSchemaBuilder.build()

    await app.listen(3001)
}

bootstrap()
