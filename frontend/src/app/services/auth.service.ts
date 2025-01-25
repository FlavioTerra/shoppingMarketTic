import http from "../../http-common";

interface Login {
	email: string;
	password: string;
}

interface ReturnDataLogin {
	result: { accessToken: string };
	user: { email: string; username: string; id: number };
}

interface SaveLoginUser {
	accessToken: string;
	user: { email: string; username: string; id: number };
}

const authService = {
	async authenticate(data: Login) {
		const response = await http.post<ReturnDataLogin>("/login", data);

		return response.data;
	},

	setLoggedUser(data: ReturnDataLogin) {
		const parsedData = JSON.stringify(data);
		localStorage.setItem("user", parsedData);
	},

	getLoggedUser() {
		const data = localStorage.getItem("user");

		if (!data) return null;

		try {
			const parsedData: SaveLoginUser = JSON.parse(data);
			return parsedData;
		} catch (error) {
			console.error(error);
			return null;
		}
	},

	cleanLoggedUser() {
		localStorage.clear();
	},
};

export { authService };
