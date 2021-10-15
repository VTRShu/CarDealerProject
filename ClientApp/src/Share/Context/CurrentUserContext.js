import { createContext } from "react";

const CurrentUserContext = createContext({
    role: null,
    dealer: null,
    code: null,
    firstLogin: null,
    user: null,
    token: null,
    profile: null,
});

export default CurrentUserContext;