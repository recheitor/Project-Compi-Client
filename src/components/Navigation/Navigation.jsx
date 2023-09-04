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
            className='mb-5 border-bottom'
            expand="lg"
        >
            <Container>
                <Link className='navbar-brand'>COMPI</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/'} className='nav-link'>Home</Link>
                    </Nav>

                    <div className="d-flex">
                        <NavDropdown
                            title={`Hello, ${loggedUser ? loggedUser.firstName : 'guest'}! `}
                            className="navbar-text"
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
                                        <Link to={'#favs'} className='nav-link'>Favs</Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item as={'div'}>
                                        <Link to={'/rooms'} className='nav-link'>Show Rooms Houses</Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item as={'div'}>
                                        <Link to={'/houses'} className='nav-link'>Show Houses</Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item as={'div'}>
                                        <Link to={'/rooms-create'} className='nav-link'>Add rooms to your houses</Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item as={'div'}>
                                        <Link to={'/house-create'} className='nav-link'>Add your house</Link>
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
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation