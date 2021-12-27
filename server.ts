import {Socket} from 'socket.io';
import {getPackageInfo, getPackageInfoById, getPackages, postPackage} from './src/api/routing/packages';
import * as fs from 'fs';
import {Observable} from 'rxjs';
import {LinkInterface} from './src/app/modules/shared/interfaces/link.interface';
import {PackageInterface} from './src/app/modules/shared/interfaces/package.interface';
import {
  createLink,
  getFileContent,
  getLinks,
  getPackageInfoOnClient,
  listenLink,
  updatePackageOnClient
} from './src/api/routing/links';

const cors = require('cors')
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const chokidar = require('chokidar');

export interface ServerDataBase {
  packages: Partial<PackageInterface>[];
  links: LinkInterface[];
}

let db: ServerDataBase;

function run(): void {
  app.use(cors());

  initiateDB().then(() => {
    io.on('connection', (socket: Socket) => {
      console.log('new client: ', socket.id);
      socket.on('disconnect', () => {
        console.log('client lost: ', socket.id);
      })
      //PACKAGES FEATURE
      getPackages(socket);
      getPackageInfo(socket);
      getPackageInfoById(socket);
      postPackage(socket);
      //LINKS FEATURE
      getLinks(socket);
      listenLink(socket);
      getPackageInfoOnClient(socket);
      updatePackageOnClient(socket);
      getFileContent(socket)
      createLink(socket)
      //APP FEATURES
    });

    app.options('*', cors())

    server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

  });
}

function readDB() {
  return new Promise(resolve => {
    fs.readFile(`./db.json`,(err: any, data: any) => {
      // @ts-ignore
      db = JSON.parse(data);
      resolve(db);
    });
  })
}

let dbWatcher: any;

async function initiateDB(): Promise<void> {
  dbWatcher = chokidar.watch(`./db.json`, {
    ignored: /^\./,
    persistent: true,
    ignoreInitial: true
  });
  await readDB();
}

export function getDataBase(): Observable<ServerDataBase> {
  return new Observable((observer) => {
    dbWatcher
      .on('change', async () => {
        await readDB();
        observer.next(db);
      })
    observer.next(db);
  });
}

run();
