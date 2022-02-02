import React, { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom'

import { Navbar, Nav, NavItem } from 'reactstrap'

// CSS
import './app.css'
import Footer from './Footer';

const App = () => {

	// MF
	const HomePage = React.lazy(() => import("HomeApp/HomePage"));
	const ContactPage = React.lazy(() => import("ContactApp/ContactPage"));
	const AboutPage = React.lazy(() => import("AboutApp/AboutPage"));

	return (
		<Router>
		<div className="container">
			<Navbar color="light" light expand="md">
				<Nav className="mr-auto" navbar>
					<NavItem>
						<Link to="/">Home</Link>
					</NavItem>
					<NavItem>
						<Link to="/contact">Contact</Link>
					</NavItem>
					<NavItem>
						<Link to="/about">About</Link>
					</NavItem>
				</Nav>
			</Navbar>
			<Switch>
				<Route exact path="/">
					<Suspense fallback={<div>Loading...</div>}>
						<HomePage />
					</Suspense>
				</Route>
				<Route exact path="/contact">
					<Suspense fallback={<div>Loading...</div>}>
						<ContactPage />
					</Suspense>
				</Route>
				<Route exact path="/about">
					<Suspense fallback={<div>Loading...</div>}>
						<AboutPage />
					</Suspense>
				</Route>
			</Switch>
		</div>
		<Footer />
		</Router>
	)
}

export default App;