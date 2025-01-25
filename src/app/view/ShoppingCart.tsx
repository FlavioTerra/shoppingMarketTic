import { MouseEvent, useEffect } from "react";
import { Button } from "../components/Button";
import { ListItem, useShoppingList } from "../contexts/ShoppingCart";
import { isNull } from "lodash";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
	const navigate = useNavigate();
	const { items, addProduct, onDecrease, onRemove, totalAmount } =
		useShoppingList();

	useEffect(() => {
		if (isNull(authService.getLoggedUser())) {
			navigate("/login");
		}
	});

	const handleAddProduct = (
		event: MouseEvent<HTMLButtonElement>,
		item: ListItem,
	) => {
		event.stopPropagation();
		addProduct(item.id, item.name, item.unityPrice);
	};

	const handleOnDecreaseProduct = (
		event: MouseEvent<HTMLButtonElement>,
		item: ListItem,
	) => {
		event.stopPropagation();
		onDecrease(item.id, item.unityPrice);
	};

	const handleOnRemoveProduct = (
		event: MouseEvent<HTMLButtonElement>,
		item: ListItem,
	) => {
		event.stopPropagation();
		onRemove(item.id);
	};

	return (
		<div className="flex h-full flex-col gap-12">
			<div className="mt-32 flex h-4/5 justify-center overflow-x-auto">
				<div className="flex w-3/6 flex-col gap-8">
					{items.map((item) => {
						return (
							<div
								key={item.id}
								className="flex justify-between rounded-3xl bg-white p-8"
							>
								<div className="flex flex-col gap-4">
									<p>
										<span className="text-center capitalize">
											Nome do Produto: {item.name}
										</span>
									</p>
									<span>Quantidade: {item.quantity}</span>
									<span>Valor Total: R${item.amount.toFixed(2)}</span>
								</div>
								<div className="flex flex-col gap-5">
									<Button onClick={(event) => handleAddProduct(event, item)}>
										+
									</Button>
									<Button
										onClick={(event) => handleOnDecreaseProduct(event, item)}
									>
										-
									</Button>
									<Button
										variant="secundary"
										onClick={(event) => handleOnRemoveProduct(event, item)}
									>
										Remover
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div>
				<span className="ml-16">
					<b>Total: </b>R$ {totalAmount.toFixed(2)}
				</span>
			</div>
		</div>
	);
};

export { ShoppingCart };
