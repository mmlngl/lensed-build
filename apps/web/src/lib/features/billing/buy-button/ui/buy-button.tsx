import type { FC } from "react";
import { Button, type ButtonProps } from "@btrt/ui/components/button";

export const BuyButton: FC<ButtonProps> = ({
	variant = "outline",
	...props
}) => {
	return (
		<Button variant={variant} {...props}>
			Buy $9.78
		</Button>
	);
};
