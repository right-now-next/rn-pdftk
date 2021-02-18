/// <reference types="node" />
import * as pdftk from "node-pdftk";
export declare function getBinPath(): string;
export declare function input(file: string | Buffer | Buffer[] | Partial<Record<pdftk.Letter, string | Buffer>>): pdftk.PDFTK;
