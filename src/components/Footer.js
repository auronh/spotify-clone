import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
  return (
    <Container className='mt-5'>
        <Row>
            <Col xs={10} className="d-flex pt-3 pb-4" style={{gap:"170px"}}>
                <ul className='p-0 d-flex flex-column gap-2' style={{listStyle:"none"}}>
                    <li className='text-white fw-semibold'>Company</li>
                    <li style={{color:"#A7A7A7"}}>About</li>
                    <li style={{color:"#A7A7A7"}}>Jobs</li>
                    <li style={{color:"#A7A7A7"}}>For the Record</li>
                </ul>
                <ul className='p-0 d-flex flex-column gap-2' style={{listStyle:"none"}}>
                    <li className='text-white fw-semibold'>Communities</li>
                    <li style={{color:"#A7A7A7"}}>For Artists</li>
                    <li style={{color:"#A7A7A7"}}>Developers</li>
                    <li style={{color:"#A7A7A7"}}>Advertising</li>
                    <li style={{color:"#A7A7A7"}}>Investors</li>
                    <li style={{color:"#A7A7A7"}}>Vendors</li>
                </ul>
                <ul className='p-0 d-flex flex-column gap-2' style={{listStyle:"none"}}>
                    <li className='text-white fw-semibold'>Useful links</li>
                    <li style={{color:"#A7A7A7"}}>Support</li>
                    <li style={{color:"#A7A7A7"}}>Free Mobile App</li>
                </ul>
            </Col>
            <Col className='d-flex gap-3 mt-3 footerIcons'>
                <a href="" className='d-flex align-items-center justify-content-center'><img src="https://cdn4.iconfinder.com/data/icons/picons-social/57/38-instagram-2-512.png" alt="" /></a>
                <a href="" className='d-flex align-items-center justify-content-center'><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/twitter-icon.png" alt="" /></a>
                <a href="" className='d-flex align-items-center justify-content-center'><img src="https://cdn3.iconfinder.com/data/icons/glypho-social-and-other-logos/64/logo-facebook-512.png" alt="" /></a>
            </Col>
            <hr className='text-white'/>
        </Row>
        <Row className='d-flex justify-content-between pt-4 pb-5'>
            <Col xs={10}>
            <ul className='p-0 d-flex gap-3' style={{listStyle:"none"}}>
                <li style={{color:"#A7A7A7"}}>Legal</li>
                <li style={{color:"#A7A7A7"}}>Privacy Center</li>
                <li style={{color:"#A7A7A7"}}>Privacy Policy</li>
                <li style={{color:"#A7A7A7"}}>Cookies</li>
                <li style={{color:"#A7A7A7"}}>About Ads</li>
                <li style={{color:"#A7A7A7"}}>Accessibility</li>
            </ul>
            </Col>
            <Col>
                <p style={{color:"#A7A7A7"}}>© 2024 Spotify AB</p>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer