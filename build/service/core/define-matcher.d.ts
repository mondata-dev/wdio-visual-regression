/// <reference types="node" />
import { AnyObject } from '../../interfaces';
export declare const MATCHER_NAME: unique symbol;
interface MatcherOptions {
    name: string;
}
interface ScreenshotManager {
    takeScreenshot(): Promise<Buffer>;
}
export declare function defineMatcher(options: MatcherOptions): <T extends ScreenshotManager>(target: new (...args: any[]) => AnyObject) => void;
export {};
