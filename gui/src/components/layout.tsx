import React, { ReactElement } from "react";

interface LayoutProps {
	children: any;
	className?: string;
	direction: "row" | "column";
	style?: React.CSSProperties;
}

export function Layout({
	children,
	direction,
	className,
	style,
}: LayoutProps): ReactElement {
	return (
		<div
			className={className}
			style={{ display: "flex", flexDirection: direction, ...style }}
		>
			{children}
		</div>
	);
}

interface Props {
	children: any;
	className?: string;
	style?: React.CSSProperties;
}

export function Row({ className, children, style }: Props): ReactElement {
	return (
		<Layout className={className} direction="row" style={style}>
			{children}
		</Layout>
	);
}

export function Column({ className, children, style }: Props): ReactElement {
	return (
		<Layout className={className} direction="column" style={style}>
			{children}
		</Layout>
	);
}
