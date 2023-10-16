import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {ObjectId} from "mongoose";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";


@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {    }
    
    @Get()
    getAll(@Query('count') count: number,
           @Query('page') page: number) {
        return this.trackService.getAllTracks(count, page)
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.trackService.searchTrack(query)
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.trackService.getTrack(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.trackService.deleteTrack(id);
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() createTrackDto: CreateTrackDto) {
        const {picture, audio} = files
        return this.trackService.create(createTrackDto, picture[0], audio[0]);
    }

    @Post('/comment')
    addComment(@Body() createCommentDto: CreateCommentDto) {
        return this.trackService.addCommentToTrack(createCommentDto);
    }

    @Post('/listen/:id')
    listen(@Param('id') id: string) {
        return this.trackService.listen(id);
    }
}