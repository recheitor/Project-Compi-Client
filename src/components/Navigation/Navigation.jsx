import { useContext } from 'react'
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {

    const { loggedUser, logout } = useContext(AuthContext)

    return (
        <Navbar
            bg="light"
            data-bs-theme="light"
            className='mb-4 border-bottom'
            expand="lg"
        >
            <Container>
                <Link to={'/'} className='navbar-brand me-auto'>COMPI</Link>
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
                    <Nav className="d-flex">

                        <NavDropdown
                            title={`Hello, ${loggedUser ? loggedUser.firstName : 'guest'}! `}
                            className="ml-5 navbar-text"
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
                                        <Link to={'#favs'} className='nav-link'>Favorite rooms</Link>
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
            </Container>
        </Navbar>
    )
}

export default Navigation