import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import EditConfigScreen from "./components/screens/edit-config";
import NewScheduleScreen from "./components/screens/new-schedule";
import ScheduleSelectorScreen from "./components/screens/schedule-selector";
import Providers from "./contexts/providers";
import './time-picker.css';
import './tabs.css';

export default function init(): void {
	ReactDOM.render(
		<div className="app">
			<Router>
				<Providers>
					<Switch>
						<Route path="/new">
							<NewScheduleScreen />
						</Route>
						<Route path="/edit">
							<EditConfigScreen />
						</Route>
						<Route path="/">
							<ScheduleSelectorScreen />
						</Route>
					</Switch>
				</Providers>
			</Router>
		</div>,
		document.getElementById("root")
	);
}
