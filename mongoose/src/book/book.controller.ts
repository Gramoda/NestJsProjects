import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Books } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService,) { }

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Books[]> {
        console.log(query);
        return this.bookService.findAll(query);
    }


    @Post()
    @UseGuards(AuthGuard())
    async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Books> {
        console.log(req.user);
        return this.bookService.createBook(book,req.user)
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Books> {
        return this.bookService.findById(id)
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() book: UpdateBookDto): Promise<Books> {
        return this.bookService.updateById(id, book)
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<Books> {
        return this.bookService.deleteById(id)
    }
}
