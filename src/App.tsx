import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./app/view/Home";
import { Layout } from "./app/components/Layout";
import { ShoppingCart } from "./app/view/ShoppingCart";
import { ShoppingListProvider } from "./app/contexts/ShoppingCart";
import { Login } from "./app/view/Login";
import { SignUp } from "./app/view/SignUp";

function App() {
	const route = createBrowserRouter([
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/register",
			element: <SignUp />,
		},
		{
			element: <Layout />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/shopping-cart", element: <ShoppingCart /> },
			],
		},
	]);

	return (
		<>
			<div className="flex h-screen items-center justify-center bg-gray-200">
				<ShoppingListProvider>
					<RouterProvider router={route}></RouterProvider>
				</ShoppingListProvider>
			</div>
		</>
	);
}

export default App;
