import { useState, ChangeEvent, useRef } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { debounce, isNull } from "lodash";
import { CiShoppingCart } from "react-icons/ci";

import { Input } from "./Input";
import { productService } from "../services/product.service";
import { ProductProps } from "../interfaces/Product";
import { List } from "./List";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useShoppingList } from "../contexts/ShoppingCart";
import { authService } from "../services/auth.service";

const Header = () => {
	const { totalQuantity } = useShoppingList();
	const [productName, setProductName] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const refDropdown = useRef<HTMLUListElement>(null);

	const { searchName } = productService();

	const {
		data: productByName,
		error,
		isLoading,
	} = useQuery<ProductProps[], Error>(
		["query-products", productName],
		async () => {
			return await searchName(productName);
		},
		{
			enabled: productName.length > 0,
			onSuccess: (result) =>
				setIsOpen(result.length > 0 && productName.length > 0),
		},
	);

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		setProductName(event.target.value);
	};

	useOnClickOutside(refDropdown, () => setIsOpen(false));

	const debounceHandleOnChange = debounce(handleInput, 500);

	return (
		<header className="fixed right-0 top-0 flex w-full justify-center bg-white py-3">
			<div className="mx-auto flex w-11/12 items-center justify-between gap-52">
				<div>
					<Link to="/" relative="path">
						<img
							src="http://localhost:5173/public/assets/logo.png"
							alt="Company Logo"
							className="max-w-36"
						/>
					</Link>
				</div>
				<div className="relative w-4/5">
					<Input onChange={debounceHandleOnChange} />
					{isOpen && (
						<ul
							ref={refDropdown}
							className="showdow-lg absolute z-50 mt-4 max-h-60 w-full overflow-auto rounded-md bg-white p-4"
						>
							{productByName?.map((product: ProductProps) => {
								return (
									<List
										key={product.id}
										className="items-center justify-between"
									>
										{product.name}
										<div>
											<img
												className="h-20 rounded-t-lg object-cover"
												src={`http://localhost:5173/assets/products/${product.image}.jpg`}
												alt={product.name}
											/>
											<span>R$ {product.price}</span>
										</div>
									</List>
								);
							})}
						</ul>
					)}
				</div>
				<div className="flex items-center justify-center">
					<Link className="flex" to="/shopping-cart" relative="path">
						<CiShoppingCart className="h-12 w-20" />
						{totalQuantity > 0 && (
							<div className="relative right-8 flex size-6 justify-center rounded-3xl bg-blue-400">
								<span>{totalQuantity}</span>
							</div>
						)}
					</Link>
					{!isNull(authService.getLoggedUser()) && (
						<span
							className="cursor-pointer"
							onClick={() => {
								authService.cleanLoggedUser();
								window.location.reload();
							}}
						>
							Logout
						</span>
					)}
				</div>
			</div>
		</header>
	);
};

export { Header };
