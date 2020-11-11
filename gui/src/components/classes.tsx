import React, { ReactElement } from "react";
import ClassData from "../models/class";
import { Column } from "./layout";
import "./classes.css";

interface Props {
	classes: ClassData[];
	addClass: () => void;
	setClassAtIndex: (index: number, data: ClassData) => void;
	removeClassAtIndex: (index: number) => void;
}

export default function Classes({
	classes,
	addClass,
	setClassAtIndex,
	removeClassAtIndex,
}: Props): ReactElement {
	return (
		<Column>
			<h2>Classes</h2>
			<ul className="class-list">
				{classes.map((cls, index) => {
					return (
						<li key={index} className="class-props-parent">
							<ul className="class-props">
								<input
									className="class-name"
									type="text"
									value={cls.class}
									onChange={(e) =>
										setClassAtIndex(index, { ...cls, class: e.target.value })
									}
								/>
								<li>
									Id:
									<br />
									<input
										type="text"
										value={cls.id}
										onChange={(e) =>
											setClassAtIndex(index, { ...cls, id: e.target.value })
										}
									/>
								</li>
								<li>
									Password:
									<br />
									<input
										type="text"
										value={cls.password}
										onChange={(e) =>
											setClassAtIndex(index, {
												...cls,
												password: e.target.value,
											})
										}
									/>
								</li>
								<button
									onClick={() => removeClassAtIndex(index)}
									className={classes.length <= 1 ? "disabled" : ""}
								>
									Delete
								</button>
							</ul>
						</li>
					);
				})}
			</ul>
			<button onClick={() => addClass()}>+</button>
		</Column>
	);
}
