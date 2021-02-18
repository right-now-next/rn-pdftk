import * as pdftk from "node-pdftk";
import * as path from "path";

export function getBinPath():string {
    if (process.platform === "linux") {
        process.env.LD_LIBRARY_PATH = path.join(__dirname, "binaries", process.platform, "lib");
    }
    process.env.PDFTK_PATH = path.join(__dirname, "binaries", process.platform, "bin", "pdftk");
    return process.env.PDFTK_PATH;
}

export function input(file: string | Buffer | Buffer[] | Partial<Record<pdftk.Letter, string | Buffer>>): pdftk.PDFTK{
    pdftk.configure({
        bin: getBinPath(),
        Promise: Promise,
        ignoreWarnings: true,
        tempDir: "./tmp"
    });
    return pdftk.input(file);
}
