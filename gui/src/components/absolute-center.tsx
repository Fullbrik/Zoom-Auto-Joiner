import "./absolute-center.css";

import React, { ReactElement } from "react";

interface Props {
	children: any;
}

export default function AbsoluteCenter({ children }: Props): ReactElement {
	return (
		<div className="absolute-center-horizontal">
			<div className="absolute-center-vertical">
				<div className="absolute-center">{children}</div>
			</div>
		</div>
	);
}
