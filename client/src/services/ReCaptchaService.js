import http from "../http-common";

const verifyReCaptcha = (token) => {
	return http.post(`/recaptcha?token=${token}`);
};

const ReCaptchaService = {
	verifyReCaptcha,
};

export default ReCaptchaService;
