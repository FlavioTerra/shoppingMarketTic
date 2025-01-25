import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv, VariantProps } from "tailwind-variants";

const inputVariants = tv({
	base: "rounded bg-gray-200 w-4/5 w-full p-2 outline-none",
	variants: {
		variant: {
			primary: "bg-gray-200",
			secondary: "bg-white",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

type InputProps = ComponentProps<"input"> & VariantProps<typeof inputVariants>;
const Input = ({ variant, className, ...props }: InputProps) => {
	const classInput = twMerge(inputVariants({ variant }), className);
	return (
		<div>
			<input
				type="text"
				placeholder="Search..."
				className={classInput}
				{...props}
			/>
		</div>
	);
};

export { Input };
