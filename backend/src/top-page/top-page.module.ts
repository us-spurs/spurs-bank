import { Module } from '@nestjs/common'
import { TopLevelCategory } from '../../libs/consts'
import { TopPageController } from './top-page.controller'

@Module({
    controllers: [TopPageController],
})
export class TopPageModule {
    _id: string
    firstLevelCategory: TopLevelCategory
    secondLevelCategory: string
    title: string
    category: string
    hh?: {
        count: number
        juniorSalary: number
        middleSalary: number
        seniorSalary: number
    }
    advantages: {
        title: string
        description: string
    }[]
    seoText: string
    tagsTitle: string
    tags: string[]
}
