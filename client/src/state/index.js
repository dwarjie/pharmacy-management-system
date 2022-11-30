// This includes the global state for the whole application
import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
	currentUser: {},
	auth: false,
});

// const resetGlobalState = () => {
// 	setGlobalState("currentUser", {});
// 	setGlobalState("auth", false);
// };

export { setGlobalState, useGlobalState };
