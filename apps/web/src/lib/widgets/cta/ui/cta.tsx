import type { ButtonProps } from "@lensed/ui/components/button";
import { T } from "@lensed/ui/components/typography";
import { cn } from "@lensed/ui/lib/utils";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { BuyButton } from "~lib/features/billing/buy-button";

export interface CtaProps extends ComponentPropsWithoutRef<"div"> {
	headline?: ReactNode;
	lead?: ReactNode;
	button?: ButtonProps;
}

export const Cta: FC<CtaProps> = ({
	headline = (
		<T.H3 asChild>
			<h1>Buy Now</h1>
		</T.H3>
	),
	lead,
	button,
	className,
	...props
}) => {
	return (
		<section
			className={cn(
				"flex flex-col gap-4 justify-center items-center bg-accent p-12 my-10 rounded-b-4xl",
				className,
			)}
			{...props}
		>
			{headline}
			{lead}
			<BuyButton {...button} />
		</section>
	);
};
