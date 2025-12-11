import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Home: React.FC = () => {
  return (
	<Container className="mt-5">
		<Row>
			<Col>
				<h1>Welcome to the Home Page</h1>
				<p>This is the main landing page of our application.</p>
			</Col>
		</Row>
	</Container>
  );
};

export default Home;