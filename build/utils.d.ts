/// <reference types="node" />
import { Subfolder } from './internal';
export declare function checkAndCreateFolder(path: string): void;
export declare function saveImage(name: string, subfoler: Subfolder, data: Buffer): void;
export declare function getImage(name: string, subfoler: Subfolder): Buffer | null;
export declare function resolvePath(name: string, subfolder: Subfolder): string;
export declare function isFunction(fn?: (...args: any[]) => unknown): boolean;
