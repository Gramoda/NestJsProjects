import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/UserSetting.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>
        ) { }

    async createUser({ settings, ...createUserDto }: CreateUserDto) {
        if (settings) {
            const newSettings = new this.userSettingsModel(settings);
            const savedNewSettings = await newSettings.save();
            const newUser = new this.userModel({
                ...createUserDto,
                settings: savedNewSettings._id,
            });
            return newUser.save();
        }
         
        
    }

    getUsers(): Promise<User[]> {
        return this.userModel.find().populate("settings");
    }

    getUserById(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });

    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}
