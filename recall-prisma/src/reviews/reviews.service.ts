import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class ReviewsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createReviewDto: Prisma.ReviewsCreateInput) {
    return this.databaseService.reviews.create({ data: createReviewDto });
  }

  findAll() {
    return this.databaseService.reviews.findMany({})
  }

  async findOne(id: number) {
    return this.databaseService.reviews.findUnique({
      where: {
        id,

      }
    });
  }

  update(id: number, updateReviewDto: Prisma.ReviewsUpdateInput) {
    return this.databaseService.reviews.update({
      where: {
        id,
      },
      data: updateReviewDto,
    })
  }

  remove(id: number) {
    return this.databaseService.product.delete({
      where: {
        id,
      }
    })
  }
}
