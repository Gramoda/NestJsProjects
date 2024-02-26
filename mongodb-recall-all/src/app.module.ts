import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Gigachad:Sigmavik@recallallcluster.34wlybb.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
