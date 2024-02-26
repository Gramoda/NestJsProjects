import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data: createProductDto });
  }

  findAll() {
    return this.databaseService.product.findMany({
      include:{
        description:true,
        review:true,
        tags:true,
      }
    })
  }

  async findOne(id: number) {
    return this.databaseService.product.findUnique({
      where: {
        id,

      }
    });
  }

  update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
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
