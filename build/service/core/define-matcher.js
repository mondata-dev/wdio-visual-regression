"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineMatcher = exports.MATCHER_NAME = void 0;
const internal_1 = require("../../internal");
exports.MATCHER_NAME = Symbol('matcherName');
const MATCH_METHOD = 'match';
const TAKE_SCREENSHOT_METHOD = 'takeScreenshot';
function validateMatcherOptions(options) {
    if (!options.name) {
        throw new Error('MatcherOptions.name is required!');
    }
}
function defineMatcher(options) {
    validateMatcherOptions(options);
    return (target) => {
        Reflect.set(target.prototype, exports.MATCHER_NAME, options.name);
        Object.defineProperty(target.prototype, MATCH_METHOD, {
            value(filename) {
                if (!(TAKE_SCREENSHOT_METHOD in this)) {
                    throw new Error('Method `takeScreenshot` must be implemented!');
                }
                return internal_1.match(filename, () => this.takeScreenshot());
            }
        });
    };
}
exports.defineMatcher = defineMatcher;
