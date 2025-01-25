import { Suspense } from "react";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<>
			<Header />
			<main className="h-5/6 w-full">
				<Suspense fallback={"Carregando aqui"}>
					<Outlet />
				</Suspense>
			</main>
		</>
	);
}

export { Layout };