import http from "../http-common";

const createRoleGroup = (data) => {
	return http.post("/role-group", data);
};

const getAllRoleGroup = () => {
	return http.get("/role-group");
};

const updateRoleGroup = (id, data) => {
	return http.put(`/role-group/${id}`, data);
};

const RoleGroupService = {
	createRoleGroup,
	getAllRoleGroup,
	updateRoleGroup,
};

export default RoleGroupService;
