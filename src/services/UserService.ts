import { getCustomRepository, Repository } from 'typeorm';

import User from '../entities/User';
import UserReponsitory from '../repositories/UserRepository';

class UserService {
    private userReponsitory: Repository<User>;

    constructor() {
        this.userReponsitory = getCustomRepository(UserReponsitory);
    }

    async create(email: string) {
        const userExistes = await this.userReponsitory.findOne({email});

        if (userExistes) {
            return userExistes;
        }

        const user = this.userReponsitory.create({
            email
        });

        await this.userReponsitory.save(user);

        return user;
    }
}

export default UserService;