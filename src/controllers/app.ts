import {Socket} from 'socket.io';
import {NOTIFY_CLIENT} from '../app/modules/shared/constants/liveFunctions.constants';
import {NotificationInterface} from '../app/modules/shared/interfaces/notification.interface';

export function notifyClient(socket: Socket, data: NotificationInterface) {
  socket.emit(NOTIFY_CLIENT, data)
}
