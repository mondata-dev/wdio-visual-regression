"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matcher = void 0;
const internal_1 = require("../../internal");
/**
 * @deprecated Will be removed in next major release. Use `defineMatcher` decorator instead.
 */
class Matcher {
    match(name) {
        return internal_1.match(name, () => this.takeScreenshot());
    }
}
exports.Matcher = Matcher;
