import { ServiceOptions } from '../interfaces';
export declare class VisualRegression {
    private config;
    private report;
    private instanceFolder?;
    private get browserInfo();
    constructor(options: ServiceOptions);
    before(): void;
    afterCommand(commandName: string, args: any[], result: any): void;
    afterTest({ description }: {
        description: string;
    }, { passed }: {
        passed: boolean;
    }): void;
    afterScenario(world: any, result: any, context: any): void;
    after(): void;
    private registerMatchers;
    private initFolders;
    private addContextToReport;
}
