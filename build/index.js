"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageCount = exports.input = exports.getBinPath = void 0;
var pdftk = __importStar(require("node-pdftk"));
var path = __importStar(require("path"));
function getBinPath() {
    if (process.platform === "linux") {
        process.env.LD_LIBRARY_PATH = path.join(__dirname, "binaries", process.platform, "lib");
    }
    process.env.PDFTK_PATH = path.join(__dirname, "binaries", process.platform, "bin", "pdftk");
    return process.env.PDFTK_PATH;
}
exports.getBinPath = getBinPath;
function input(file) {
    pdftk.configure({
        bin: getBinPath(),
        Promise: Promise,
        ignoreWarnings: true,
        tempDir: "./tmp"
    });
    return pdftk.input(file);
}
exports.input = input;
function getPageCount(pdf) {
    return pdf.dumpDataUtf8().output().then(function (buff) {
        var regex = /NumberOfPages: (\d*)/g;
        var matchs = regex.exec(buff.toString());
        if (!matchs || (matchs === null || matchs === void 0 ? void 0 : matchs.length) == 0) {
            return 0;
        }
        return Number(matchs[1]) !== NaN ? Number(matchs[1]) : 0;
    });
}
exports.getPageCount = getPageCount;
