import { Request , Response } from 'express';
import SettingService from '../services/SettingService';

class SettingController {
    async create(request: Request, response: Response) {
        try {
            const { chat, username } = request.body;
            const settingService = new SettingService();
            const setting = await settingService.create({ chat, username });

            return response.json(setting);
        } catch (error) {
            return response.status(400).json({
                message: error.message
            })
        }
    }

    async findByUserName(request: Request, response: Response) {
        try {
            const { username } = request.params;
            const settingService = new SettingService();
            const setting = settingService.findByUserName(username);

            return response.json(setting);
        } catch (error) {
            return response.status(400).json({
                message: error.message
            });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const { username } = request.params;
            const { chat } = request.body;

            const settingService = new SettingService();
            const setting = settingService.update(username, chat);

            return response.json(setting);
        } catch (error) {
            return response.status(400).json({
                message: error.message
            });
        }
    }
}

export default SettingController;