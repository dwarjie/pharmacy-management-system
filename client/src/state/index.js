// This includes the global state for the whole application
import { createGlobalState } from "react-hooks-global-state";
import AuthService from "../services/AuthService";

const { setGlobalState, useGlobalState } = createGlobalState({
	currentUser: AuthService.getCurrentUser() || {},
	auth: AuthService.getToken().isAuthenticated || false,
});

export { setGlobalState, useGlobalState };
