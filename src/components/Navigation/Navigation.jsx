import { useContext } from 'react'
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import './Navigation.css'

const Navigation = () => {

    const { loggedUser, logout } = useContext(AuthContext)

    return (
        <>
            <Navbar
                bg="light"
                data-bs-theme="light"
                className='fixed-top border-bottom'
                expand="lg"
            >
                {/* <Link to={'/'} className='navbar-brand me-auto'>COMPI</Link> */}

                <Link to={'/'} className='navbar-brand me-auto'>
                    <img
                        alt=""
                        src="https://res.cloudinary.com/dbtmrinwa/image/upload/v1693994770/agzs58eqvik7ryjou9zb.png"
                        width="120"
                        height="40"
                        className="d-inline-block align-top"
                    />{' '}
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">



                    <Nav className="ms-auto mx-5">
                        {
                            loggedUser &&
                            <>
                                <Nav className="me-auto">
                                    <Link
                                        to={'/house-create'}
                                        className='nav-link'
                                    >
                                        Add your house
                                    </Link>
                                </Nav>
                                <Nav className='mt-2'>
                                    |
                                </Nav>
                                <Nav className="me-auto">
                                    <Link
                                        to={'/rooms-create'}
                                        className='nav-link'
                                    >
                                        Add rooms to your houses
                                    </Link>
                                </Nav>
                            </>
                        }
                    </Nav>
                    <Nav className="d-flex nav-bar-dropdown">
                        <NavDropdown
                            title={`Hello, ${loggedUser ? loggedUser.firstName : 'guest'}! `}
                            className="me-auto navbar-text"
                            id="basic-nav-dropdown"
                        >
                            {
                                !loggedUser &&
                                <>
                                    <NavDropdown.Item as={'div'}>
                                        <Link to={'/signup'} className='nav-link'>Signup</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={'div'}>
                                        <Link to={'/login'} className='nav-link'>Login</Link>
                                    </NavDropdown.Item>
                                </>
                            }
                            {
                                loggedUser &&
                                <>
                                    <NavDropdown.Item as={'div'}>
                                        <Link to={'#messages'} className='nav-link'>Messages</Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item as={'div'}>
                                        <Link to={'/account'} className='nav-link'>Account</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />

                                    <NavDropdown.Item as={'div'}>
                                        <Link to={'/add-amenity'} className='nav-link'>ADMIN - Add amenity</Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />

                                    <NavDropdown.Item>
                                        <span className='nav-link' onClick={logout}>Logout</span>
                                    </NavDropdown.Item>
                                </>
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="navbar-space"></div>
        </>
    )
}

export default Navigation