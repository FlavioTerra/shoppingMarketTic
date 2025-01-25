export interface ProductProps {
	id: number;
	name: string;
	description: string;
	price: number;
	quantity: number;
	category: string;
	image: string;
}

export interface Product {
	item: ProductProps; 
}