import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Books } from './schemas/book.schema';
import * as mongoose from 'mongoose';

import { UpdateBookDto } from './dto/update-book.dto';

import { Query as ExpressQuery } from 'express-serve-static-core'
import { User } from '../auth/schemas/user.schema';
 
@Injectable()
export class BookService {
    constructor( @InjectModel(Books.name)
        private bookModel: mongoose.Model<Books>
    ){}

    async findAll( query:ExpressQuery):Promise<Books[]>{
        
        const resPerPage = 2
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)


        const keyword = query.keyword ? {
            title:{
                $regex: query.keyword,
                $options: 'i',
            }
        } : {}
        
        const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
        return books;
    }

    async createBook(book:Books, user: User):Promise<Books>{
        
        const data = Object.assign(book, { user: user._id})

        const res = await this.bookModel.create(data);
        return res;
    }

    async findById(id:string):Promise<Books>{
        
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('Not correct id, try another');
        }
        const book = await this.bookModel.findById(id);
        if(!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async updateById(id:string, book:UpdateBookDto):Promise<Books>{
        
        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
            
        })
    }

    async deleteById(id:string):Promise<Books>{
        return await this.bookModel.findByIdAndDelete(id);
    }
}
