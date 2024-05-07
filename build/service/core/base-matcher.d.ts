/// <reference types="node" />
/**
 * @deprecated Will be removed in next major release. Use `defineMatcher` decorator instead.
 */
export declare abstract class Matcher {
    abstract takeScreenshot(): Promise<Buffer>;
    match(name: string): Promise<number>;
}
