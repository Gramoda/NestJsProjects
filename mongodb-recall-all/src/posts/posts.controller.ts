import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';

@Controller('posts')
export class PostsController {

    constructor(private postsService :PostsService ) {}

    @Post()
    @UsePipes(new ValidationPipe())
    CreatePost(@Body() createPostDto: CreatePostDto) {
        console.log(createPostDto);
        return this.postsService.createPost(createPostDto);
    }   
}
