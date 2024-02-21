"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.Subfolder = void 0;
const path_1 = require("path");
const internal_1 = require("./internal");
const DEFAULT_FOLDER = 'regression';
const DEFAULT_MATCHERS = [internal_1.ViewportMatcher, internal_1.ElementMatcher];
const DEFAULT_ALLOWED_MISMATCH = 0.1;
const LARGE_IMAGE_THRESHOLD = 1200;
var Subfolder;
(function (Subfolder) {
    Subfolder["ACTUAL"] = "actual";
    Subfolder["DIFF"] = "diff";
    Subfolder["EXPECTED"] = "expected";
})(Subfolder = exports.Subfolder || (exports.Subfolder = {}));
class Config {
    constructor() {
        this.options = {};
    }
    get outputDir() {
        var _a;
        return (_a = this.options.outputDir) !== null && _a !== void 0 ? _a : DEFAULT_FOLDER;
    }
    get instanceDir() {
        var _a;
        const instanceFolder = (_a = this.options.instanceFolder) !== null && _a !== void 0 ? _a : '';
        return path_1.join(this.outputDir, instanceFolder);
    }
    get customMatchers() {
        var _a;
        if (Array.isArray((_a = this.options) === null || _a === void 0 ? void 0 : _a.customMatchers)) {
            return [...DEFAULT_MATCHERS, ...this.options.customMatchers];
        }
        return DEFAULT_MATCHERS;
    }
    get allowedMismatch() {
        var _a;
        return (_a = this.options.allowedMismatch) !== null && _a !== void 0 ? _a : DEFAULT_ALLOWED_MISMATCH;
    }
    get ressembleOutput() {
        var _a;
        return {
            largeImageThreshold: (_a = this.options.largeImageThreshold) !== null && _a !== void 0 ? _a : LARGE_IMAGE_THRESHOLD
        };
    }
    static get() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
    patch(value) {
        this.options = Object.assign(Object.assign({}, this.options), value);
    }
}
exports.Config = Config;
