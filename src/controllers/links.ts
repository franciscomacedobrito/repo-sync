import {getDataBase} from "../../server";
import {listenToPackageById} from "./packages";
import {PackageInterface} from "../app/modules/shared/interfaces/package.interface";
const yalc = require('yalc');


export async function doGetLinks(callback: any): Promise<void> {
  const db = await getDataBase();
  callback(db.links);
}

export async function listenToLink(link: any, callback: any) {
  if(link.active) {
    await listenToPackageById(link.package, (packageDetails: PackageInterface) => {
      console.log('change happened on listenToPackageById on package: ', packageDetails.name)
      // yalc.publishPackage({
      //   workingDir: packageDetails.path,
      // }).then(() => {
      //   callback( `${packageDetails.name} published`);
      // })
    }, {ignoreInitial: true})
  }
}
