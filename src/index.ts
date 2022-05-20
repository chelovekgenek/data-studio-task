import * as GetDataFns from './getData';
import * as GetConfigFns from './getConfig';
import * as GetSchemaFns from './getSchema';
import * as AuthFns from './auth';

declare const global: {
    [x: string]: (...args: any[]) => void;
};

global.getData = GetDataFns.getData;
global.getAuthType = AuthFns.getAuthType;
global.isAuthValid = AuthFns.isAuthValid;
global.resetAuth = AuthFns.resetAuth;
global.setCredentials = AuthFns.setCredentials;
global.getConfig = GetConfigFns.getConfig;
global.getSchema = GetSchemaFns.getSchema;
