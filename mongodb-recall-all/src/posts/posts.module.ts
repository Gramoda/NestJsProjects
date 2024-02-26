import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post,PostsSchema} from 'src/schemas/Posts.schema';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { User, UserSchema } from 'src/schemas/User.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Post.name,
                schema: PostsSchema
            },
            {
                name: User.name,
                schema: UserSchema
            }
        ])
    ],
    controllers: [PostsController],
    providers: [PostsService],

})
export class PostsModule { }
