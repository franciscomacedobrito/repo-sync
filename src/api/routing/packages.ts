import {
  GET_PACKAGE_INFO,
  GET_PACKAGE_INFO_BY_ID,
  GET_PACKAGES,
  POST_PACKAGE
} from '../../app/modules/shared/constants/liveFunctions.constants';
import {Socket} from 'socket.io';
import {
  createPackage,
  doGetPackageByPath,
  doGetPackages,
  listenToPackageById,
  listenToPackageByPath
} from '../../controllers/packages';

const chokidar = require('chokidar');

async function publishPackageInfo(socket: Socket, filePath: string, callback: any): Promise<void> {
  doGetPackageByPath(filePath).then(packageInfo => {
    callback(packageInfo);
  }).catch(e => {
    callback({error: e.message});
  })

}

export const getPackageInfo = (socket: Socket) => {
  socket.on(GET_PACKAGE_INFO, async (data: any, callback) => {
    const {filePath} = data;

    listenToPackageByPath(filePath, (packageInfo: any) => {
      console.log('routing => listenToPackageByPath', callback)
      callback(packageInfo);
    })

  });
}

export const getPackageInfoById = (socket: Socket) => {
  socket.on(GET_PACKAGE_INFO_BY_ID, async (id: string, callback) => {

    listenToPackageById(id, (packageInfo: any) => {
      console.log('routing => getPackageInfoById', callback)
      callback(packageInfo);
    })

  });
}

export const postPackage = (socket: Socket) => {
  socket.on(POST_PACKAGE, createPackage);
}

export const getPackages = (socket: Socket) => {

  socket.on(GET_PACKAGES, async (packages, callback) => {
    const watcher = chokidar.watch(`db.json`, {
      ignored: /^\./,
      persistent: true,
      ignoreInitial: true
    });
    watcher
      .on('change', async () => {
        doGetPackages(packages, callback);
      })

    doGetPackages(packages, callback);

  });
}
