import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CostsService } from "./costs.service";
import { AuthService } from "src/auth/auth.service";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CreateCostDto } from "./dto/createcost.dto";
import { UpdateCostDto } from "./dto/updatecost.dto";

@Controller('Costs')
export class CostsController {
    constructor(
        private readonly costService: CostsService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(JwtGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllCosts(@Req() req, @Res() res) {

        const token = req.token;

        const user = await this.authService.getUserByTokenData(token);
        const costs = await this.costService.findUserCosts(user._id as string);
        
        return res.send(costs);
    }

    @UseGuards(JwtGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    async createCost(@Req() req, @Body() createCostDto: CreateCostDto) {

        const user = await this.authService.getUserByTokenData(req.token);

        return await this.costService.create({
            ...createCostDto,
            userid: user._id as string,
        })
        
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateCost(@Param('id') id: string, @Body() updateCostDto: UpdateCostDto) {

        return await this.costService.update(updateCostDto,id)
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteCost(@Param('id') id: string) {

        return await this.costService.delete(id)
    }
}