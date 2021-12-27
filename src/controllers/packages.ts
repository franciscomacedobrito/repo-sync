import {getDataBase} from '../../server';
import * as fs from 'fs';
import {v4 as uuid} from 'uuid';
import simpleGit from 'simple-git';
import {PackageInterface} from '../app/modules/shared/interfaces/package.interface';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

const chokidar = require('chokidar');

export function doGetPackages(packages: any, callback: any): Subscription {
  return getDataBase().subscribe(db => {
    callback(db.packages);
  });
}

export function doGetPackageById(packageId: string, callback: any) {
  doGetPackages(undefined, async (packages: any[]) => {
    const tempPack = packages.find(pack => pack.id === packageId);
    try {
      callback(await doGetPackageByPath(tempPack.path));
    } catch (e) {
      callback({error: e.message ? e.message : `cant listen to ${tempPack.path}`});
    }
  })
}

export function listenToPackageById(packageId: string, callback: any, options?: any) {
  doGetPackages(undefined, async (packages: PackageInterface[]) => {
    const tempPack = packages.find(pack => pack.id === packageId);
    if (tempPack) {
      await listenToPackageByPath(tempPack.path, (packageDetails: any) => {
        callback(packageDetails);
      }, options)
    }
  })
}


export function doGetPackageByPath(filePath?: string): Promise<any> {
  return new Promise((async (resolve, reject) => {
    try {
      const repo = simpleGit({baseDir: filePath})
      const branch = await repo.branch();
      fs.readFile(`${filePath}/package.json`, (err: any, data: any) => {
        // @ts-ignore
        let file = JSON.parse(data);
        resolve({
          path: filePath,
          name: file.name,
          version: file.version,
          branch: branch.current
        });
      });
    } catch (e) {
      reject(e)
    }
  }))
}

export async function listenToPackageByPath(path: string, callback: any, options?: any) {
  const watcher = chokidar.watch(`${path}`, {
    ignored: [/yalc/, /node_modules/],
    persistent: true,
    ignoreInitial: true
  });

  if (!options?.ignoreInitial) {
    try {
      callback(await doGetPackageByPath(path));
    } catch (e) {
      callback({error: e.message ? e.message : `cant listen to ${path}`});
    }
  }

  watcher
    .on('change', async (file: string) => {
      console.log(file)
      try {
        callback(await doGetPackageByPath(path));
      } catch (e) {
        callback({error: e.message ? e.message : `cant listen to ${path}`});
      }
    })
}

export async function createPackage(path: string, callback: any) {
  try {
    getDataBase().pipe(first()).subscribe(db => {
      db.packages.push({path, id: uuid()});
      fs.writeFile(`./db.json`, JSON.stringify(db), () => callback(db));
    });
  } catch (e) {
    callback({error: e.message});
  }
}
