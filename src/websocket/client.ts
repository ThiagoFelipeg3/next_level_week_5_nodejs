import { io } from '../http';
import ConnectionService from '../services/ConnectionService';
import UserService from '../services/UserService';
import MessageService from '../services/MessageService';

interface IParams {
    text: string;
    email: string;
}

io.on('connect', (socket) => {
    const connectionService = new ConnectionService();
    const userService = new UserService();
    const messageService = new MessageService();

    socket.on('client_first_access', async (params: IParams) => {
        const socket_id = socket.id;
        const { text, email } = params;

        let user = await userService.findByEmail(email);

        if (!user) {
            user = await userService.create(email);

            connectionService.create({
                socket_id,
                user_id: user.id
            });
        } else {

            const connection = await connectionService.findByUserId(user.id);

            if (!connection) {
                await connectionService.create({
                    socket_id,
                    user_id: user.id
                });
            } else {
                connection.socket_id = socket_id;
                connectionService.create(connection);
            }
        }

        messageService.create({
            text, user_id: user.id
        })

    });
});