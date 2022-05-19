import { UserProperty } from '../types';

export class SlToken {
    static delete(): void {
        PropertiesService.getUserProperties().deleteProperty(
            UserProperty.SL_TOKEN
        );
    }

    static set(token: string): string {
        PropertiesService.getUserProperties().setProperty(
            UserProperty.SL_TOKEN,
            token
        );
        return token;
    }

    static get(): string | null {
        return PropertiesService.getUserProperties().getProperty(
            UserProperty.SL_TOKEN
        );
    }
}
