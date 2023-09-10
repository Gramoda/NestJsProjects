import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {

    public users: User[] = [];

    getUsers(): User[] {

        return this.users;
    }

    findUser(id: number): User {
        const findedUser = this.users.find((elem) =>  elem.id === id )
        console.log(findedUser);
        if (findedUser) {
            return findedUser;
        } else throw new NotFoundException('user not found');
    }

    postUser(user: User): User {
        
        this.users.push(user);
        console.log(this.users);
        return user;
    }

    deleteUser(email: string): User[] {
        const remainUsers = this.users.filter((elem) => { elem.email !== email })
        this.users = remainUsers;
        return this.users;
    }
}
