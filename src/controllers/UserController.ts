import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
    async create(resquest: Request, response: Response) {
        try {
            const { email } = resquest.body;
            const userService = new UserService();
            const user = await userService.create(email);

            return response.json(user);
        } catch (error) {
            return response.status(400).json({
                message: error.message
            })
        }
    }
}

export default UserController;