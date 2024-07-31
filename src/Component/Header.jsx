import IndiaAf from "../assets/Image/India Africa2024.png";
import Cii from "../assets/Image/cii.svg";
import IndiaLion from "../assets/Image/IndiaLion.svg";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Header.css"; // Import the CSS file

const Header = () => {
  return (
    <>
      <Navbar className="header-navbar">
        <Container>
          <Row className="w-100 align-items-center">
            <Col xs={4} className="d-flex justify-content-start">
              <LazyLoadImage
                src={IndiaAf}
                alt="Left Logo"
                effect="blur"
                className="header-logo"
              />
            </Col>
            <Col xs={4} className="d-flex justify-content-center">
              <LazyLoadImage
                src={IndiaLion}
                alt="Center Logo"
                effect="blur"
                className="header-logo"
              />
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <LazyLoadImage
                src={Cii}
                alt="Right Logo"
                effect="blur"
                className="header-logo"
              />
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
