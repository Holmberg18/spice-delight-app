import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import { loginRequest } from '@/auth/auth-config';

const Auth = () => {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const handleLoginRedirect = () => {
        instance
            .loginRedirect({
                ...loginRequest,
                prompt: 'create',
            })
            .catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
        });
        window.location.reload();
    }
    return (
        <div className="App">
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <>
                        <button onClick={handleLogoutRedirect}>Logout</button>
                        <p>You are signed in!</p>
                    </>
                ) : null}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <button onClick={handleLoginRedirect}>Login</button>
                <p>Please sign in</p>
            </UnauthenticatedTemplate>
        </div>
    );
}

export default Auth