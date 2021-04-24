import { getCustomRepository } from "typeorm";
import UserReponsitory from "../repositories/UserRepository";

class UserService {
    async create(email: string) {
        const userReponsitory = getCustomRepository(UserReponsitory);
        const userExistes = await userReponsitory.findOne({email});

        if (userExistes) {
            return userExistes;
        }

        const user = userReponsitory.create({
            email
        });

        await userReponsitory.save(user);

        return user;
    }
}

export default UserService;