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
}

export default SettingService