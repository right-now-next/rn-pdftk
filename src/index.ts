import * as pdftk from "node-pdftk";
import * as path from "path";

function getBinPath() {
    if (process.platform === "linux") {
        process.env.LD_LIBRARY_PATH = path.join(__dirname, "binaries", process.platform, "lib");
    }
    return path.join(__dirname, "binaries", process.platform, "bin", "pdftk");
}

pdftk.configure({
    bin: getBinPath(),
    Promise: Promise,
    ignoreWarnings: true,
    tempDir: "./tmp"
});

export function input(file: string | Buffer | Buffer[] | Partial<Record<pdftk.Letter, string | Buffer>>): pdftk.PDFTK{
    return pdftk.input(file);
}
