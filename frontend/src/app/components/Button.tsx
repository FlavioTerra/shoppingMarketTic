import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
	base: "rounded w-full py-2 px-4 text-sm font-bold text-white transition-colors ease-in-out",
	variants: {
		variant: {
			primary: "bg-blue-500 hover:bg-blue-700 hover:text-black",
			secundary: "bg-red-500 hover:bg-red-700",
		},
	},
	defaultVariants: {
		variant: "primary",
	}
});

type PropsButton = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

const Button = ({className, children, variant, ...props}: PropsButton) => {
	const classButton = twMerge(buttonVariants({ variant }), className);

	return (
		<button className={classButton} {...props}>
			{children}
		</button>
	);
};

export { Button };