import http from "../../http-common";
import { ProductProps } from "../interfaces/Product";

const productService = () => {
	const findAll = async (type: string) => {
		if (type) {
			const response = await http.get<ProductProps[]>("products/?_sort=price");
			return type == "desc" ? response.data.reverse() : response.data;
		}

		const response = await http.get<ProductProps[]>("products");
		return response.data;
	};

	const searchName = async (name: string) => {
		const response = await http.get<ProductProps[]>(`products?name=${name}`);
		return response.data;
	};

	return { findAll, searchName };
};

export { productService };
