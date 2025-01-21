export declare class TempSignupDataService {
    private tempDataStore;
    set(email: string, data: any): void;
    get(email: string): any;
    delete(email: string): void;
}
