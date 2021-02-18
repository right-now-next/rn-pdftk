//import * as pdftk from "node-pdftk";
function getBinPath() {
    switch (process.platform) {
        case "linux":
            return "linux";
            break;
        case "darwin":
            return "darwin";
            break;
    }
}
console.log("cem");
console.log(getBinPath());
//linux: export LD_LIBRARY_PATH=$(pwd)/lib && $(pwd)/bin/pdftk
