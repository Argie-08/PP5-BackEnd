import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="adminHeader">
        <Container className="">
          <Row>
            <Col className="headerContent">
              <h4 className="headerText">Bayangan Bay Resort</h4>
              <h5 className="headerText">Administrator</h5>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Header;
