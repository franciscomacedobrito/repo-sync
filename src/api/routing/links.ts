import {GET_LINKS} from '../../app/modules/shared/constants/liveFunctions.constants';
import {Socket} from "socket.io";
import {doGetLinks} from "../../controllers/links";

const chokidar = require('chokidar');

export const getLinks = (socket: Socket) => {
  socket.on(GET_LINKS, async (data, callback) => {
    const watcher = chokidar.watch(`db.json`, {
      ignored: /^\./,
      persistent: true,
      ignoreInitial: true,
    });
    watcher
      .on('change', async (data: any) => {
        doGetLinks(callback);
      })

    doGetLinks(callback);

  });
}
