import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Posts.schema';
import { CreatePostDto } from './dto/CreatePost.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async createPost({ userId, ...createPostDto }: CreatePostDto) {
        const findUser = await this.userModel.findById(userId);
        if (!findUser) {
            throw new HttpException('user not found', 404)
        }

        console.log(userId);
        const newPost = new this.postModel(createPostDto);
        const savedPost = await newPost.save();
        await findUser.updateOne({$push: {
            posts: savedPost._id,
        }})

        return savedPost;
    }

    findPostById() {

    }
}
