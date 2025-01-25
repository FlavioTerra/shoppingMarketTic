import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { isNull } from "lodash";
import { authService } from "../services/auth.service";

const SignUp = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		username: "",
	});

	useEffect(() => {
		if (!isNull(authService.getLoggedUser())) {
			navigate("/");
		}
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		void fetch("http://localhost:3001/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then(() => {
				navigate("/login");
			});
	};

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<h1>Sing Up</h1>
			<form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
				<Input
					type="text"
					variant="secondary"
					placeholder="Username"
					value={formData.username}
					name="username"
					onChange={(e) => handleChange(e)}
				/>
				<Input
					type="text"
					variant="secondary"
					placeholder="Email"
					value={formData.email}
					name="email"
					onChange={(e) => handleChange(e)}
				/>
				<Input
					type="password"
					variant="secondary"
					placeholder="Password"
					value={formData.password}
					name="password"
					onChange={(e) => handleChange(e)}
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export { SignUp };
