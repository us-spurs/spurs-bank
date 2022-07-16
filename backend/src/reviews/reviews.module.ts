import { Module } from '@nestjs/common'
import { ReviewsController } from './reviews.controller'

@Module({
    controllers: [ReviewsController],
})
export class ReviewsModule {
    _id: string
    name: string
    title: string
    description: string
    rating: string
    createdAt: Date
}
