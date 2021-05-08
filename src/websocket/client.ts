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

        const allMessages = await messageService.listByUser(user.id);
        socket.emit('client_list_all_messages', allMessages);

        const allUsers = await connectionService.findAllWithoutAdmin();
        io.emit('admin_list_all_users', allUsers);
    });

    socket.on('client_send_to_admin', async (params) => {
        const { text, socket_admin_id } = params;

        const socket_id = socket.id;

        const { user_id } = await connectionService.findBySocketID(socket_id);

        const message = await messageService.create({
          text,
          user_id,
        });

        io.to(socket_admin_id).emit('admin_receive_message', {
          message,
          socket_id,
        });

    });

    socket.on('disconnect', async () => {
        await connectionService.deleteBySocketId(socket.id);
    });
});