import * as React from "react";
import { cn } from "@/lib/utils"
import { NavLink } from "react-router";

const NavBar: React.FC = () => {
	return (
		<Navbar bg="dark" data-bs-theme="dark">
			<Container>
				<Nav className="me-auto">
					<Nav.Link as={NavLink} to="/">
					Home
					</Nav.Link>
					<Nav.Link as={NavLink} to="/connexion">
					Connexion
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	)
};

export default NavBar;