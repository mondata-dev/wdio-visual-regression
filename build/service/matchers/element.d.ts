/// <reference types="webdriverio/webdriverio-core" />
/// <reference types="node" />
export declare class ElementMatcher {
    private element;
    constructor(element: WebdriverIO.Element);
    takeScreenshot(): Promise<Buffer>;
    private getElementRect;
}
