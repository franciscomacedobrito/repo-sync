import {getDataBase} from '../../server';
import {doGetPackageById, listenToPackageById, listenToPackageByPath} from './packages';
import {PackageInterface} from '../app/modules/shared/interfaces/package.interface';
import {LinkInterface} from '../app/modules/shared/interfaces/link.interface';
import * as fs from 'fs';
import {compare, Options} from 'dir-compare';
import {first} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';

const yalc = require('yalc');

export async function doGetLinks(callback: any): Promise<void> {
  getDataBase().subscribe(db => {
    callback(db.links);
  });
}

export async function doGetPackageInfoOnClient(link: LinkInterface, callback: any) {
  await listenToPackageById(link.client, async (clientDetails: PackageInterface) => {
    await listenToPackageById(link.package, async (packageDetails: PackageInterface) => {
      const packageOnClientPath = `${clientDetails.path}\\.yalc\\${packageDetails.name}`;
      await listenToPackageByPath(packageOnClientPath, async (packageDetailsOnClient: PackageInterface) => {
        fs.readFile(`${packageOnClientPath}\\yalc.sig`, 'utf8', async (err: any, packageSignatureOnClient: any) => {
          const packageSignature = packageSignatureOnClient;
          const packageOnStorePath = `${yalc.getStorePackagesDir()}\\${packageDetails.name}\\${packageDetailsOnClient.version}`;
          fs.readFile(
            `${packageOnStorePath}\\yalc.sig`,
            'utf8',
            (err: any, packageSignatureOnStore: any) => {
              const options: Options = {
                compareContent: true,
                excludeFilter: '*.sig, package-lock.json, .gitignore, package.json, node_modules, .git, .idea, .yalc'
              };

              compare(packageDetails.path, packageOnStorePath, options).then(differencesBetweenLocalAndStore => {
                compare(packageOnStorePath, packageOnClientPath, options)
                  .then(differencesBetweenStoreAndClient => {
                    const differentFiles = differencesBetweenLocalAndStore.diffSet?.filter((diff: any) => diff.state !== 'equal');
                    callback({
                      differences: {
                        ...differencesBetweenLocalAndStore,
                        diffSet: differentFiles,
                        // ...differencesBetweenStoreAndClient,
                        // differences: differencesBetweenLocalAndStore.differences + differencesBetweenStoreAndClient.differences,
                        sameVersion: packageDetailsOnClient.version === packageDetails.version
                      },
                      package: {
                        ...packageDetailsOnClient,
                        versionOnClient: packageDetailsOnClient.version,
                        currentVersion: packageDetails.version,
                        localSignature: packageSignature,
                        storeSignature: packageSignatureOnStore,
                        updated: differencesBetweenStoreAndClient.same
                          && differencesBetweenLocalAndStore.same
                          && packageDetailsOnClient.version === packageDetails.version
                          && packageSignature === packageSignatureOnStore
                      },
                      client: clientDetails
                    });
                  })
                  .catch(error => console.error(error));
              })

            })
        })
      })
    })
  })
}

export async function doUpdatePackageOnClient(link: LinkInterface, callback: any, update = true) {
  await doGetPackageById(link.package, async (packageDetails: PackageInterface) => {
    await doGetPackageById(link.client, async (clientDetails: PackageInterface) => {
      await yalc.publishPackage({
        workingDir: packageDetails.path,
        link: true,
        update,
        private: true
      })
      await yalc.addPackages([packageDetails.name], {
        workingDir: clientDetails.path,
        link: true,
        update,
        private: true
      }).then(() => {
        console.log(`${packageDetails.name} updated on ${clientDetails.name}`)
        callback(`${clientDetails.name} published on ${packageDetails.name}`);
      });
    })
  })
}

export async function listenToLink(link: LinkInterface, callback: any) {
  console.log('yalc store: ', yalc.getStoreMainDir());
  if (link.active) {
    await listenToPackageById(link.package, async (packageDetails: PackageInterface) => {
      console.log('change happened on listenToPackageById on package: ', packageDetails.name)
      await yalc.publishPackage({
        workingDir: packageDetails.path,
        link: true,
        update: true,
        private: true
      })
      await listenToPackageById(link.client, async (clientDetails: PackageInterface) => {
        await yalc.addPackages([packageDetails.name], {
          workingDir: clientDetails.path,
          link: true,
          update: true,
          private: true
        })
        callback(`${clientDetails.name} published on ${packageDetails.name}`);
      })

    }, {ignoreInitial: true})
  }
}

export async function doCreateLink(client: string, packageId: string, callback: any) {
  try {
    getDataBase().pipe(first()).subscribe(db => {
      const link = {client, package: packageId, id: uuid(), active: false}
      db.links.push(link);
      fs.writeFile(`./db.json`, JSON.stringify(db), async () => {
        await doUpdatePackageOnClient(link, callback, false);
      });
    });
  } catch (e) {
    callback({error: e.message});
  }
}
