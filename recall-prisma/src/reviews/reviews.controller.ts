import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Prisma } from '@prisma/client';


@Controller('Reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: Prisma.ReviewsCreateInput) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: Prisma.ReviewsUpdateInput) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
