import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NewScheduleScreen from "./components/screens/new-schedule";
import ScheduleSelectorScreen from "./components/screens/schedule-selector";
import Providers from "./contexts/providers";

export default function init(): void {
	ReactDOM.render(
		<div className="app">
			<Providers>
				<Router>
					<Switch>
						<Route path="/new">
							<NewScheduleScreen />
						</Route>
						<Route path="/">
							<ScheduleSelectorScreen />
						</Route>
					</Switch>
				</Router>
			</Providers>
		</div>,
		document.getElementById("root")
	);
}
