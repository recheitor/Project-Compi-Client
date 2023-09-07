import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {

    return (
        <>
            <div className="footer border-top">
                <p className='company-name'>© 2023 Compi, Inc.</p>
                <p>·</p>
                <Link to={'#terms'} className='nav-link'>Terms</Link>
                <p>·</p>
                <Link to={'#terms/privacy-policy'} className='nav-link'>Privacy</Link>
                <p>·</p>
                <Link to={'#help/privacy-choices'} className='nav-link'>Your Privacy Choices</Link>
            </div>
            <div className="footer-space"></div>
        </>
    )
}

export default Footer