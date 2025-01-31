/// <reference types="node" />
import * as pdftk from "node-pdftk";
export declare function getBinPath(): string;
export declare function configure(): void;
export declare function input(file: string | Buffer | Buffer[] | Partial<Record<pdftk.Letter, string | Buffer>>): pdftk.PDFTK;
export declare function getPageCount(file: string | Buffer | Buffer[] | Partial<Record<pdftk.Letter, string | Buffer>>): Promise<number>;
