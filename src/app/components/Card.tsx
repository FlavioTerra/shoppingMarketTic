import { Product } from "../interfaces/Product";
import { Button } from "./Button";
import { useShoppingList } from "../contexts/ShoppingCart";

const Card = ({item}: Product) => {
	const { addProduct } = useShoppingList();

	return (
		<div className="flex flex-col justify-center h-96 bg-white p-4 w-64 rounded-2xl">
			<div className="flex justify-center">
				<img 
					className="h-40 rounded-t-lg object-cover"
					src={`http://localhost:5173/assets/products/${item.image}.jpg`}
					alt={item.name}
				/>
			</div>
			<div className="p-4 flex flex-col gap-2">
				<div className="flex justify-center items-center mb-2">
					<span className="text-center capitalize font-bold">{item.name}</span>
				</div>
				<div className="flex justify-center items-center">
					<span>R$ {item.price}</span>
				</div>
			</div>
			<Button onClick={(e) => {e.stopPropagation(); addProduct(item.id, item.name, item.price)}}>
				Adicionar ao carrinho
			</Button>
		</div>
	);
};

export { Card };