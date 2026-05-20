import { cn } from "@studio-albums/ui/lib/utils";
import type { FC } from "react";

export const Box: FC<React.ComponentProps<"div">> = ({
	children,
	className,
	...props
}) => (
	<div
		className={cn("border-2 border-black m-2 py-2 px-3", className)}
		{...props}
	>
		{children}
	</div>
);
