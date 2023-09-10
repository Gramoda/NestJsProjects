import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
    private fakeUsers =[
        {username : 'Arthur', email: 'Doshirex@gmail.com'},
        {username : 'Cringe', email: 'Cringe@gmail.com'},
        {username : 'Staraus', email: 'Cyapla@gmail.com'},
    ];
    fetchUsers(){
        return this.fakeUsers;

    }

    createUser(userData:CreateUserDto){

        this.fakeUsers.push(userData);
        return this.fakeUsers;
    }

    getUserById(id:number){

        return {id, username : 'Arthur', email: 'Doshirex@gmail.com'};
    }
}
