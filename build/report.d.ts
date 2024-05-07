interface MatchCommandResult {
    fileName: string;
    mismatch: number;
    files: {
        actual: string | null;
        expected: string | null;
        diff: string | null;
    };
}
interface ReportData {
    testName: string;
    passed: boolean;
    browser: string;
    matchers: MatchCommandResult[];
}
export declare type TestContextResult = Omit<ReportData, 'matchers'>;
export declare class VisualRegressionReport {
    private config;
    private report;
    private lastTestCase;
    private get reportPath();
    private get isReportExist();
    saveMatcherResult(name: string, mismatch: number): void;
    saveTestContext(context: Partial<TestContextResult>): void;
    generate(): void;
    clear(): void;
}
export {};
