import * as React from "react";
import { Container, Row, Col, Form, Button, FormGroup } from "react-bootstrap"; //Check equivalent for shadcn-ui or tailwindcss
import { useState } from "react";

const Connexion: React.FC = () => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

  return (
	<Container className="mt-5">
		<Row>
			<Col>
				<Form>
					<Form.Group controlId="username" className="mb-3">
						<Form.Label>Username</Form.Label>
						<Form.Control
							onChange={(e) => setUsername(e.target.value)}
							type="text"
							required
						/>
					</Form.Group>

					<Form.Group controlId="password" className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							required
						/>
					</Form.Group>
					<Button type="submit">Connexion</Button>
				</Form>
				<h1>Welcome to the Connexion Page</h1>
				<p>This is the main landing page of our application.</p>
			</Col>
		</Row>
	</Container>
  );
};

export default Connexion;

