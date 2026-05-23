import type { FC } from "react";
import { Button, type ButtonProps } from "@lensed/ui/components/button";

export const BuyButton: FC<ButtonProps> = ({
	variant = "outline",
	children = "Buy $9.78",
	...props
}) => {
	return (
		<Button variant={variant} {...props}>
			{children}
		</Button>
	);
};
