"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualRegression = void 0;
const path_1 = require("path");
const internal_1 = require("../internal");
class VisualRegression {
    constructor(options) {
        this.config = internal_1.Config.get();
        this.report = new internal_1.VisualRegressionReport();
        const { outputDir, customMatchers, largeImageThreshold, instanceFolder, allowedMismatch } = options;
        this.instanceFolder = instanceFolder;
        this.config.patch({ outputDir, customMatchers, largeImageThreshold, allowedMismatch });
    }
    get browserInfo() {
        const { browserName, browserVersion, version, platform, platformName } = browser.capabilities;
        return { browserName, browserVersion: version !== null && version !== void 0 ? version : browserVersion, platform: platform !== null && platform !== void 0 ? platform : platformName };
    }
    before() {
        this.initFolders();
        this.registerMatchers();
        this.report.clear();
    }
    afterCommand(commandName, args, result) {
        const hasMatcherName = this.config.customMatchers.includes(commandName);
        const hasMatcherClass = this.config.customMatchers
            .filter(item => typeof item === 'function' && Reflect.get(item.prototype, internal_1.MATCHER_NAME) === commandName)
            .length > 0;
        if (hasMatcherClass || hasMatcherName) {
            this.report.saveMatcherResult(args[0], result);
        }
    }
    // Jasmine and mocha
    afterTest({ description }, { passed }) {
        this.addContextToReport({ testName: description, passed });
    }
    // Cucumber
    afterScenario(world, result, context) {
        this.addContextToReport({ testName: context.scenario, passed: result.status === 'passed' });
    }
    after() {
        this.report.generate();
    }
    registerMatchers() {
        this.config.customMatchers.forEach(item => {
            if (typeof item === 'function') {
                const matcherName = Reflect.get(item.prototype, internal_1.MATCHER_NAME);
                browser.addCommand(matcherName, (name, ...args) => {
                    const instance = Reflect.construct(item, args);
                    return instance.match(name);
                });
            }
        });
    }
    initFolders() {
        internal_1.checkAndCreateFolder(this.config.outputDir);
        if (this.instanceFolder && internal_1.isFunction(this.instanceFolder)) {
            this.config.patch({ instanceFolder: this.instanceFolder(this.browserInfo) });
            internal_1.checkAndCreateFolder(this.config.instanceDir);
        }
        for (const key of Object.values(internal_1.Subfolder)) {
            const path = path_1.resolve(this.config.instanceDir, key);
            internal_1.checkAndCreateFolder(path);
        }
    }
    addContextToReport({ testName, passed }) {
        const { platform, browserName, browserVersion } = this.browserInfo;
        const version = browserVersion === null || browserVersion === void 0 ? void 0 : browserVersion.split('.')[0];
        const browser = `${browserName}_${version}_${platform}`.toLowerCase();
        this.report.saveTestContext({ testName, passed, browser });
    }
}
exports.VisualRegression = VisualRegression;
