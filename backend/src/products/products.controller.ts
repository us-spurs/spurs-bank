import { Body, Controller, Delete, Post, Patch, Param, HttpCode } from '@nestjs/common'
import { ProductsModule } from './products.module'
import { FindProductsDto } from './dto/find-products.dto'

@Controller('products')
export class ProductsController {
    @Post('create')
    async create(@Body() dto: Omit<ProductsModule, '_id'>) {}

    @Get(':id')
    async get(@Param('id') id: string) {}

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: ProductsModule) {}

    @Delete(':id')
    async delete(@Param('id') id: string) {}

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindProductsDto) {}
}
