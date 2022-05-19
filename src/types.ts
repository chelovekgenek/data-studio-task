export interface Config {
    name: string;
    email: string;
    postLimit: '100' | '1000' | '10000';
}

export interface Script {
    lastRefresh: string; // '1652733182946'
}

export enum UserProperty {
    CLIENT_ID = 'clientId',
    SL_TOKEN = 'slToken',
}

export interface GetDataParams {
    configParams: Config;
    scriptParams: Script;
    fields: Record<'name', string>[];
}
