import { ServiceOptions, AnyObject } from './interfaces';
interface ConfigOptions extends Omit<ServiceOptions, 'instanceFolder'> {
    instanceFolder?: string;
}
export declare enum Subfolder {
    ACTUAL = "actual",
    DIFF = "diff",
    EXPECTED = "expected"
}
export declare class Config {
    private static instance;
    private options;
    get outputDir(): string;
    get instanceDir(): string;
    get customMatchers(): (AnyObject | string)[];
    get allowedMismatch(): number;
    get ressembleOutput(): {
        largeImageThreshold: number;
    };
    get initiateExpectedImage(): boolean;
    private constructor();
    static get(): Config;
    patch(value: ConfigOptions): void;
}
export {};
