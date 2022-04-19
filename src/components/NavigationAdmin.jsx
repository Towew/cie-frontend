import React, {useContext} from 'react'
import Frame from "./assets/Frame.png";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import cssModule from './css/Navigation.module.css';
import { UserContext } from '../context/userContext';
import { Container, Navbar as NavbarComp, Nav, NavDropdown } from 'react-bootstrap'

export default function NavigationAdmin(props) {
    
    const [state, dispatch] = useContext(UserContext)

    let navigate = useNavigate()

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/login")
    }
    
    return (
       /*  <nav>
            <div className={cssModule.navbarStore}>
                <div className={cssModule.navLeft}>
                    <Link to='/list-product'><img src={Frame} alt="" /></Link>
                </div>
                <ul className={cssModule.navRight}>
                    <li><Link to='/admin-complaint'>Complain</Link></li>
                    <li><Link to='/list-category'>Category</Link></li>
                    <li><Link to='/list-product'>Product</Link></li>
                    <li><Link onClick={logout}>Logout</Link></li>
                </ul>
            </div>
        </nav> */

        <NavbarComp expand="lg">
            <Container>
                <NavbarComp.Brand as={Link} to="/list-product">
                    <img src={Frame} className="img-fluid" style={{ width: '60px', height: '60px' }} />
                </NavbarComp.Brand>
                <NavbarComp.Toggle className={cssModule.togller} aria-controls="basic-navbar-nav" />
                <NavbarComp.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className={props?.title == 'Complain Page' ? cssModule.navLinkActive : cssModule.navLink} as={Link} to="/admin-complaint">Complain</Nav.Link>
                        <Nav.Link className={props?.title == 'List Category' ? cssModule.navLinkActive : cssModule.navLink} as={Link} to="/list-category">Category</Nav.Link>
                        <Nav.Link className={props?.title == 'List Product' ? cssModule.navLinkActive : cssModule.navLink} as={Link} to="/list-product">Product</Nav.Link>
                        <Nav.Link className={cssModule.navLink} onClick={logout}>Logout</Nav.Link>
                    </Nav>
                </NavbarComp.Collapse>
            </Container>
        </NavbarComp>


    );
}