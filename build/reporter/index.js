"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const config_1 = require("../config");
const utils_1 = require("../utils");
exports.REPORT_FILENAME = 'report.json';
class VisualRegressionReport {
    constructor() {
        this.config = config_1.Config.get();
        this.report = [];
        this.lastTestCase = { matchers: [] };
    }
    saveMatcherResult(name, mismatch) {
        var _a;
        const actual = utils_1.resolvePath(name, config_1.Subfolder.ACTUAL);
        const expected = utils_1.resolvePath(name, config_1.Subfolder.EXPECTED);
        const diff = utils_1.resolvePath(name, config_1.Subfolder.DIFF);
        (_a = this.lastTestCase.matchers) === null || _a === void 0 ? void 0 : _a.push({
            mismatch,
            fileName: `${name}.png`,
            files: {
                actual: fs_1.existsSync(actual) ? actual : undefined,
                expected: fs_1.existsSync(expected) ? expected : undefined,
                diff: fs_1.existsSync(diff) ? diff : undefined
            }
        });
    }
    saveTestContext(context) {
        this.lastTestCase = Object.assign(Object.assign({}, this.lastTestCase), context);
        this.report.push(this.lastTestCase);
        this.lastTestCase = { matchers: [] };
    }
    generate() {
        const reportFile = path_1.resolve(this.config.outputDir, exports.REPORT_FILENAME);
        if (fs_1.existsSync(reportFile)) {
            const report = fs_1.readFileSync(reportFile, { encoding: 'utf8' });
            this.report = [...JSON.parse(report), ...this.report];
        }
        fs_1.writeFileSync(reportFile, JSON.stringify(this.report, null, 2));
    }
    clear() {
        const report = path_1.resolve(this.config.outputDir, exports.REPORT_FILENAME);
        if (fs_1.existsSync(report)) {
            fs_1.unlinkSync(report);
        }
    }
}
exports.VisualRegressionReport = VisualRegressionReport;
