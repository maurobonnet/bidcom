export interface Links {
    originalUrl: string;
    id: string;
    valid: boolean;
    expiry: Date;
    password?: string;
    clicks: number;
}
export interface LinkResponse {
    target: string;
    link: string;
    valid: boolean;
}