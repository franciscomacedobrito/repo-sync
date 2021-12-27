import {
  CREATE_LINK,
  GET_FILE_CONTENT,
  GET_LINKS,
  GET_PACKAGE_INFO_ON_CLIENT,
  LISTEN_LINK,
  UPDATE_PACKAGE_ON_CLIENT
} from '../../app/modules/shared/constants/liveFunctions.constants';
import {Socket} from 'socket.io';
import {
  doCreateLink,
  doGetLinks,
  doGetPackageInfoOnClient,
  doUpdatePackageOnClient,
  listenToLink
} from '../../controllers/links';
import {LinkInterface} from '../../app/modules/shared/interfaces/link.interface';
import {notifyClient} from '../../controllers/app';
import * as fs from 'fs';

const chokidar = require('chokidar');

export const getLinks = (socket: Socket) => {
  socket.on(GET_LINKS, async (data, callback) => {
    const watcher = chokidar.watch(`db.json`, {
      ignored: /^\./,
      persistent: true,
      ignoreInitial: true
    });
    watcher
      .on('change', async (data: any) => {
        doGetLinks(callback);
      })

    doGetLinks(callback);

  });
}

export const updatePackageOnClient = (socket: Socket) => {
  socket.on(UPDATE_PACKAGE_ON_CLIENT, async (link: LinkInterface, callback) => {
    doUpdatePackageOnClient(link, (message: any) => {
      const data: any = {
        message,
        type: 'success'
      }
      callback(data)
    })
  });
}

export const getFileContent = (socket: Socket) => {
  socket.on(GET_FILE_CONTENT, async (filepath: string, callback) => {
    const watcher = chokidar.watch(`${filepath}`, {
      persistent: true,
      ignoreInitial: false
    });

    fs.readFile(
      filepath,
      'utf8',
      (err: any, fileCont: any) => {
        callback(fileCont);
      })

    watcher
      .on('change', async (file: string) => {
        try {
          fs.readFile(
            filepath,
            'utf8',
            (err: any, fileCont: any) => {
              callback(fileCont);
            })
        } catch (e) {
          callback({error: e.message ? e.message : `cant open ${filepath}`});
        }
      })
  });
}

export const listenLink = (socket: Socket) => {
  socket.on(LISTEN_LINK, async (link: LinkInterface, callback) => {
    listenToLink(link, (message: any) => {
      const data: any = {
        message,
        type: 'success'
      }
      notifyClient(socket, data);
      callback(data)
    })
  });
}

export const getPackageInfoOnClient = (socket: Socket) => {
  socket.on(GET_PACKAGE_INFO_ON_CLIENT, async (link: LinkInterface, callback) => {
    doGetPackageInfoOnClient(link, (data: any) => {
      callback(data);
    })
  });
}

export const createLink = (socket: Socket) => {
  socket.on(CREATE_LINK, async ({client, packageId}, callback) => {
    doCreateLink(client, packageId, (data: any) => {
      callback(data);
    })
  });
}

