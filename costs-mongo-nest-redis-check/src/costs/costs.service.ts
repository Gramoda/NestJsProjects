import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Costs, CostsDocument } from "src/schemas/costs.schema";
import { CreateCostDto } from "./dto/createcost.dto";
import { UpdateCostDto } from "./dto/updatecost.dto";

@Injectable()
export class CostsService {
    constructor(@InjectModel(Costs.name) private costsModel: Model<CostsDocument>,
    ) { }

    async findaAll(): Promise<Costs[]> {
        return this.costsModel.find();

    }

    async findUserCosts(id:string): Promise<Costs[]> {
        return this.costsModel.find({userid:id})
    }

    async findOne(id:string): Promise<Costs> {
        return this.costsModel.findOne({_id:id});

    }

    async create(createCostsDto: CreateCostDto): Promise<Costs> {
        const createCosts = new this.costsModel(createCostsDto);
        return createCosts.save();
    }

    async update(updateCostDto: UpdateCostDto, id: string): Promise<Costs> {
        await this.costsModel.updateOne(
            { _id: id },
            {
                $set: {
                    ...updateCostDto
                },
            },
        );

        return this.findOne(id);

    }

    async delete(id: string): Promise<void> {
        await this.costsModel.deleteOne({_id:id})

    }


}