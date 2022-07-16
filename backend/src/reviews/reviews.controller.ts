import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { ReviewsModule } from './reviews.module'

@Controller('reviews')
export class ReviewsController {
    @Post('create')
    async create(@Body() dto: Omit<ReviewsModule, '_id'>) {}

    @Delete(':id')
    async delete(@Param('id') id: string) {}

    @Post('byProduct/:productId')
    async getByProduct(@Param('productId') productId: string) {}
}
