import * as config from "~/config";
import { useEffect } from "react";
import { clientClearJwt } from "~/utils/authentication";
import { dispatchAuthenticationEvent } from "~/events/AuthenticationEvent";
import { useNavigate } from "react-router";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        clientClearJwt();
        dispatchAuthenticationEvent();
        navigate(config.ROUTES.LOGIN);
    }, []);

    return <>
        <h1>Logging out</h1>
        <p>You will be redirected shortly.</p>
    </>;
}