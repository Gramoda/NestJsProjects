import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Model } from "mongoose";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileService } from "../file/file.service";
import { FileType } from "src/types/types";

@Injectable()
export class TrackService {

    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService) { }

    async create(createTrackDto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const track = await this.trackModel.create({ ...createTrackDto, listens: 0, audio: audioPath, picture: picturePath })
        return track;
    }

    async getAllTracks(count = 10, page = 0): Promise<Track[]> {

        return await this.trackModel.find().skip(Number(page)).limit(Number(count));
    }

    async getTrack(id: string): Promise<Track> {

        return await this.trackModel.findById(id).populate('comments');
    }

    async deleteTrack(id: string): Promise<void> {

        await this.trackModel.findByIdAndDelete(id);
    }

    async addCommentToTrack(createCommentDto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(createCommentDto.trackId);
        const comment = await this.commentModel.create({ ...createCommentDto })
        track.comments.push(comment._id)
        await track.save();
        return comment;
    }

    async listen(id: string) {

        const track = await this.trackModel.findById(id);
        track.listens += 1
        track.save()
    }

    async searchTrack(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find(
            {
                name: {$regex: new RegExp(query)}
            }
        )
        return tracks;
    }
}