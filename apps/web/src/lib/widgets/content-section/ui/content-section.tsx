import { T } from "@btrt/ui/components/typography";
import { cn } from "@btrt/ui/lib/utils";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

export interface ContentSectionProps
	extends ComponentPropsWithoutRef<"section"> {
	heading: ReactNode;
	footer?: ReactNode;
}

export const ContentSection: FC<ContentSectionProps> = ({
	heading,
	footer,
	className,
	children,
	...props
}) => {
	return (
		<section className={cn(className)} {...props}>
			<T.H1 className="border-b border-t border-muted-foreground py-2 mb-4 uppercase text-3xl">
				{heading}
			</T.H1>

			{children}

			{footer ? (
				<div className="mr-10 text-muted-foreground">{footer}</div>
			) : null}
		</section>
	);
};
