import { Card } from "../components/Card"
import { productService } from "../services/product.service";
import { useQuery } from "react-query";
import { ProductProps } from "../interfaces/Product";
import { useState } from "react";
import { List } from "../components/List";
import { Button } from "../components/Button";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const menuListVariants = tv({
	variants: {
		variant: {
			menuList: "absolute z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg",
		}
	},
});

const Home = () => {
	const [typeFilter, setTypeFilter] = useState<string>("");
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const listOptionsFilter = [
		{
			value: "desc",
			name: "Maior preço",
			class: "flex justify-center w-full cursor-pointer"
		},
		{
			value: "asc",
			name: "Menor preço",
			class: "flex justify-center w-full cursor-pointer"
		}
	]

	const { findAll } = productService();	

	const {
		data: products,
		error,
		isLoading,
	} = useQuery<ProductProps[], Error>(["query-products", typeFilter], async () => {
		return await findAll(typeFilter);
	});

	const handleFilter = (value: string) => {
		setTypeFilter(value);
	};

	const handleFilterButton = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const menuListClass = twMerge(
		menuListVariants(), 
		isMenuOpen 
		? "flex items-center flex-col absolute top-60 bg-white rounded-md p-4 shadow-lg shadow-black w-44"
		: "hidden"
	);

	return (
		<div className="mt-32 flex h-4/5 w-full flex-col items-center justify-center gap-16">
			<div className="flex w-4/5 flex-col items-end">
				<Button className="w-24" onClick={handleFilterButton}>
					Filtro
				</Button>
				<ul className={menuListClass}>
					{listOptionsFilter.map((item) => {
						return (
							<List 
								key={item.name} 
								className={item.class} 
								onClick={(e) => {e.stopPropagation(); handleFilter(item.value)}}>
								{item.name}
							</List>
						)
					})}
				</ul>
			</div>

			<div className="grid h-5/6 w-11/12 grid-cols-4 gap-4 overflow-x-auto">
				{products?.map((product: ProductProps) => {
					return (
						<Card key={product.id} item={product}/>
					);
				})}
			</div>
		</div>
	);
};

export { Home };