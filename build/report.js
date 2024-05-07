"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualRegressionReport = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const internal_1 = require("./internal");
const REPORT_FILENAME = 'report.json';
class VisualRegressionReport {
    constructor() {
        this.config = internal_1.Config.get();
        this.report = [];
        this.lastTestCase = { matchers: [] };
    }
    get reportPath() {
        return path_1.resolve(this.config.outputDir, REPORT_FILENAME);
    }
    get isReportExist() {
        return fs_1.existsSync(this.reportPath);
    }
    saveMatcherResult(name, mismatch) {
        var _a;
        const getExistPathOrNull = (subfoler) => {
            const path = internal_1.resolvePath(name, subfoler);
            return fs_1.existsSync(path) ? path : null;
        };
        (_a = this.lastTestCase.matchers) === null || _a === void 0 ? void 0 : _a.push({
            mismatch,
            fileName: `${name}.png`,
            files: {
                actual: getExistPathOrNull(internal_1.Subfolder.ACTUAL),
                expected: getExistPathOrNull(internal_1.Subfolder.EXPECTED),
                diff: getExistPathOrNull(internal_1.Subfolder.DIFF)
            }
        });
    }
    saveTestContext(context) {
        this.lastTestCase = Object.assign(Object.assign({}, this.lastTestCase), context);
        this.report.push(this.lastTestCase);
        this.lastTestCase = { matchers: [] };
    }
    generate() {
        if (this.isReportExist) {
            const report = fs_1.readFileSync(this.reportPath, { encoding: 'utf8' });
            this.report = [...JSON.parse(report), ...this.report];
        }
        fs_1.writeFileSync(this.reportPath, JSON.stringify(this.report, null, 2));
    }
    clear() {
        if (this.isReportExist) {
            fs_1.unlinkSync(this.reportPath);
        }
    }
}
exports.VisualRegressionReport = VisualRegressionReport;
