import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '../auth/auth.module'
import { TopPageModule } from '../top-page/top-page.module'
import { ProductsModule } from '../products/products.module'
import { ReviewsModule } from '../reviews/reviews.module'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [AuthModule, TopPageModule, ProductsModule, ReviewsModule, ConfigModule.forRoot()],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
