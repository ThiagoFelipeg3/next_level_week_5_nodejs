import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UserReponsitory extends Repository<User> {

}

export default UserReponsitory;