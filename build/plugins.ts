import type { Plugin } from "vite"
import { resolve } from "path"
import { readFileSync, writeFileSync } from "fs"

/**
 * 自动修改版本号
 * @returns 
 */
export function changePackageVersion(): Plugin {
  if (process.env.NODE_ENV !== "development") {
    let packagePath = resolve(__dirname, "../package.json");
    let packageStr = readFileSync(packagePath, {
      encoding: "utf-8"
    });
    let packageJson = JSON.parse(packageStr);
    let version = packageJson.version;
    let versionArr: (string | number)[] = version.split(".");
    let lastVersionNum = +versionArr[versionArr.length - 1];
    lastVersionNum++;
    versionArr.splice(versionArr.length - 1, 1, lastVersionNum);
    packageJson.version = versionArr.join(".");
    writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), {
      encoding: "utf-8"
    })
  }
  return {
    name: "changePackageVersion"
  }
}