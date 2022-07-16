import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'

@Module({
    controllers: [ProductsController],
})
export class ProductsModule {
    _id: string
    image: string
    title: string
    price: number
    oldPrice: number
    credit: number
    calculatedRating: number
    description: string
    advantages: string
    disAdvantages: string
    categories: string[]
    tags: string
    characteristics: {
        [key: string]: string
    }
}
