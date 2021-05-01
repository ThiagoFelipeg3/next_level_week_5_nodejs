import { getCustomRepository, Repository } from 'typeorm';

import Setting from '../entities/Setting';
import SettingRepository from '../repositories/SettingRepository';

interface ISettingsCreate {
    chat: boolean,
    username: string
}

class SettingService {
    private settingRepository: Repository<Setting>;

    constructor() {
        this.settingRepository = getCustomRepository(SettingRepository);
    }

    async create({ chat, username }: ISettingsCreate) {
        await this.userAlreadyExists(username);

        const setting = this.settingRepository.create({
            chat,
            username
        });

        await this.settingRepository.save(setting);

        return setting;
    }

    private async userAlreadyExists(username: string) {
        const userAlreadyExists = await this.settingRepository.findOne({username});

        if (userAlreadyExists) {
            throw new Error('User already existis!');
        }
    }

    public async findByUserName(username: string) {
        const setting = await this.settingRepository.findOne({
            username
        });

        return setting;
    }

    public async update(username: string, chat: boolean) {
        const setting = await this.settingRepository
        .createQueryBuilder()
        .update(Setting)
        .set({ chat })
        .where('username = :username', {
            username
        })
        .execute();

        return setting;
    }
}

export default SettingService