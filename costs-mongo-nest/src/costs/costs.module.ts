import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Costs, CostsSchema } from "src/schemas/costs.schema";

import { CostsService } from "./costs.service";
import { CostsController } from "./costs.controller";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports:[
        MongooseModule.forFeature([{name: Costs.name, schema: CostsSchema}]),
        AuthModule,
    ],
    exports:[CostsService],
    providers:[CostsService],
    controllers:[CostsController],
    
})
export class CostsModule {}