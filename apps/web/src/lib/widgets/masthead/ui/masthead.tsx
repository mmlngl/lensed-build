import { cn } from "@btrt/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef, FC } from "react";
import { BuyButton } from "~lib/features/billing/buy-button";

export const Masthead: FC<ComponentPropsWithoutRef<"div">> = ({
	className,
	...props
}) => {
	return (
		<div
			className={cn("flex justify-between items-baseline", className)}
			{...props}
		>
			<nav className="flex items-center gap-8">
				<Link to="/" className="hover:underline font-bold">
					BTRT
				</Link>

				<Link
					to="/skills"
					className="hover:underline"
					activeProps={{ className: "text-primary" }}
				>
					Skills
				</Link>

				<Link
					to="/about"
					className="hover:underline"
					activeProps={{ className: "text-primary" }}
				>
					About
				</Link>

				<Link
					to="/guide"
					className="hover:underline"
					activeProps={{ className: "text-primary" }}
				>
					Guide
				</Link>
			</nav>

			<div>
				<BuyButton />
			</div>
		</div>
	);
};
