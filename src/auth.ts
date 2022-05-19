import { UserProperty } from './types';

const cc = DataStudioApp.createCommunityConnector();

export const resetAuth = () =>
    PropertiesService.getUserProperties().deleteProperty(
        UserProperty.CLIENT_ID
    );

export const isAuthValid = () =>
    !!PropertiesService.getUserProperties().getProperty(UserProperty.CLIENT_ID);

export const getAuthType = () => {
    return cc.newAuthTypeResponse().setAuthType(cc.AuthType.KEY).build();
};

interface SetCredentialsInput {
    key: string;
}

export const setCredentials = (
    credentials: SetCredentialsInput = { key: 'ju16a6m81mhid5ue1z3v2g0uh' }
) => {
    PropertiesService.getUserProperties().setProperty(
        UserProperty.CLIENT_ID,
        credentials.key
    );

    return cc.newSetCredentialsResponse().setIsValid(true).build();
};
