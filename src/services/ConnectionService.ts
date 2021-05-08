import { getCustomRepository, Repository } from "typeorm";
import Connection from "../entities/Connection";
import ConnectionRepository from "../repositories/ConnectionRepository";

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionService {
    private connectionRepository: Repository<Connection>;

    constructor() {
        this.connectionRepository = getCustomRepository(ConnectionRepository);
    }

    public async create({socket_id, user_id, admin_id, id}: IConnectionCreate) {
        const connection = this.connectionRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await this.connectionRepository.save(connection);
        return connection;
    }

    public async findByUserId(user_id: string) {
        return this.connectionRepository.findOne({
            user_id,
        });
    }

    public async findAllWithoutAdmin() {
        return this.connectionRepository.find({
          where: { admin_id: null },
          relations: ["user"],
        });
    }

    public async findBySocketID(socket_id: string) {
        const connection = await this.connectionRepository.findOne({
          socket_id,
        });

        return connection;
    }

    public async updateAdminID(user_id: string, admin_id: string) {
        await this.connectionRepository
        .createQueryBuilder()
        .update(Connection)
        .set({ admin_id })
        .where("user_id = :user_id", {
        user_id,
        })
        .execute();
    }

    public async deleteBySocketId(socket_id: string) {
        await this.connectionRepository
        .createQueryBuilder()
        .delete()
        .where("socket_id = :socket_id", {
        socket_id,
        })
        .execute();
    }
}

export default ConnectionService;