import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: '59c8c9d8-69d9-4b62-ad0d-a5b03f3e6c38',
        authority: 'https://login.microsoftonline.com/2e8adc15-abe2-48fe-bb41-404a11b9c330/', 
        redirectUri: 'http://localhost:3000/redirect',
        postLogoutRedirectUri: '/', 
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level:any, message:any, containsPii:any) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};


export const loginRequest = {
    scopes: [],
};
