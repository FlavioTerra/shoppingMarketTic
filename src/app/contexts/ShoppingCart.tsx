import { createContext, ReactNode, useContext, useState } from "react";

interface ShoppingListProviderProps {
	children: ReactNode;
}

export interface ListItem {
	id: number;
	name: string;
	quantity: number;
	unityPrice: number;
	amount: number;
}

export interface ShoppingCartListContextData {
	items: ListItem[];
	totalAmount: number;
	totalQuantity: number;
	addProduct: (id: number, name: string, price: number) => void;
	onRemove: (id: number) => void;
	onDecrease: (id: number, price: number) => void;
}

const ShoppingListContextDefaultValues = {
	items: [],
	totalAmount: 0,
	totalQuantity: 0,
	addProduct: () => null,
	onRemove: () => null,
	onDecrease: () => null
}

const ShoppingListContext = createContext<ShoppingCartListContextData>(
	ShoppingListContextDefaultValues
);

export const ShoppingListProvider = ({
	children,
}: ShoppingListProviderProps) => {
	const [items, setItems] = useState<ListItem[]>([]);
	
	const addProduct = (id: number, name: string, price: number) => {
		const productAlreadyExists = items.find((product) => product.id === id);

		if (!productAlreadyExists) {
			const item: ListItem = {
				id,
				name,
				quantity: 1,
				unityPrice: price,
				amount: price,
			}
			
			return setItems([...items, item]);
		}

		if (productAlreadyExists) {
			const updateCart = items.map((cartItem) => {
				return cartItem.id === id ? {
					...cartItem,
					quantity: Number(cartItem.quantity) + 1,
					amount: cartItem.amount + price,
				} : cartItem;
			});

			return setItems(updateCart);
		}
	}

	const onRemove = (id: number) => {
		const filteredItems = items.filter((item) => item.id !== id);
		return setItems(filteredItems);	
	}

	const onDecrease = (id: number, price: number) => {
		const productAlreadyExists = items.find((product) => product.id === id);

		if (productAlreadyExists && productAlreadyExists.quantity <= 1) {
			return onRemove(id);
		}

		if (productAlreadyExists) {
			const updateCart = items.map((cartItem) => {
				return cartItem.id === id ? {
					...cartItem,
					quantity: Number(cartItem.quantity) - 1,
					amount: cartItem.amount - price,
				} : cartItem;
			});

			return setItems(updateCart);
		}
	}

	const totalAmount = items.reduce((acc, item) => acc + item.amount, 0);

	const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<ShoppingListContext.Provider value={
			{items, totalAmount, totalQuantity, addProduct, onDecrease, onRemove}
		}>
			{children}
		</ShoppingListContext.Provider>
	);
}

export const useShoppingList = () => useContext(ShoppingListContext);