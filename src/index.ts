import * as pdftk from "node-pdftk";
import * as path from "path";

export function getBinPath(): string {
    if (process.platform === "linux") {
        process.env.LD_LIBRARY_PATH = path.resolve(path.join(__dirname, "binaries", process.platform, "lib"));
    }
    process.env.PDFTK_PATH = path.resolve(path.join(__dirname, "binaries", process.platform, "bin", "pdftk"));
    return process.env.PDFTK_PATH;
}

export function configure(){
    //check is it AWS LAMBDA
    /*
    Please use lambda layers for aws lambda
    */
    if(process.env.LAMBDA_TASK_ROOT && process.env.LAMBDA_TASK_ROOT!==""){
        return;
    }
    pdftk.configure({
        bin: getBinPath(),
        Promise: Promise,
        ignoreWarnings: true,
        tempDir: "/tmp"
    });
    return;
}

export function input(file: string | Buffer | Buffer[] | Partial<Record<pdftk.Letter, string | Buffer>>): pdftk.PDFTK {
    configure();
    return pdftk.input(file);
}
export function getPageCount(file: string | Buffer | Buffer[] | Partial<Record<pdftk.Letter, string | Buffer>>) {
    configure();
    return pdftk.input(file).dumpDataUtf8().output().then(buff => {
        const regex = /NumberOfPages: (\d*)/g;
        const matchs = regex.exec(buff.toString());
        if (!matchs || matchs?.length == 0) {
            return 0;
        }
        return Number(matchs[1]) !== NaN ? Number(matchs[1]) : 0;
    });
}
