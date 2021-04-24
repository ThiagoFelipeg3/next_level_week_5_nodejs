import { getCustomRepository } from 'typeorm';
import SettingRepository from '../repositories/SettingRepository';

interface ISettingsCreate {
    chat: boolean,
    username: string
}

class SettingService {
    async create({ chat, username }: ISettingsCreate) {
        await this.userAlreadyExists(username);

        const settingRepository = getCustomRepository(SettingRepository);
        const setting = settingRepository.create({
            chat,
            username
        });

        await settingRepository.save(setting);

        return setting;
    }

    private async userAlreadyExists(username: string) {
        const settingRepository = getCustomRepository(SettingRepository);
        const userAlreadyExists = await settingRepository.findOne({username});

        if (userAlreadyExists) {
            throw new Error('User already existis!');
        }
    }
}

export default SettingService