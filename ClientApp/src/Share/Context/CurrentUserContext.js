import { createContext } from "react";

const CurrentUserContext = createContext({
    token: null,
    role: null,
    dealer: null,
    code: null,
    firstLogin: null,
    user: null,
});

export default CurrentUserContext;