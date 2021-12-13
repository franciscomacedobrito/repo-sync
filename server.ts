import {Socket} from "socket.io";
import {getPackageInfo, getPackages, postPackage} from "./src/api/routing/packages";
import * as fs from "fs";
import {listenToLink} from "./src/controllers/links";

const cors = require('cors')
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

export interface ServerDataBase {
  packages: any;
  links: any;
}

function run(): void {

  app.use(cors())

  io.on('connection', (socket: Socket) => {
    console.log('new client: ', socket.id);
    getPackages(socket);
    getPackageInfo(socket);
    postPackage(socket);
  });

  app.options('*', cors())

  server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

  listenToLink({
    id: "1",
    active: true,
    package: "123",
    client: "321"
  }, (message: string) => {
    console.log(message)
  })
}

export function getDataBase(): Promise<ServerDataBase> {
  return new Promise(resolve => {
    fs.readFile(`./db.json`, async (err: any, data: any) => {
      // @ts-ignore
      resolve(JSON.parse(data));
    });
  })
}

run();
