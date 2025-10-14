import React from 'react'

const Footer = () => {
  return (
    <footer className="amazon-footer mt-5">
      <div className="container">
        <div className="footer-section">
          <div className="row">
            <div className="col-md-3">
              <h5 className="footer-title">Get to Know Us</h5>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press Releases</a></li>
                <li><a href="#">Amazon Science</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="footer-title">Connect with Us</h5>
              <ul className="footer-links">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="footer-title">Make Money with Us</h5>
              <ul className="footer-links">
                <li><a href="#">Sell on Amazon</a></li>
                <li><a href="#">Sell under Amazon Accelerator</a></li>
                <li><a href="#">Protect and Build Your Brand</a></li>
                <li><a href="#">Amazon Global Selling</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="footer-title">Let Us Help You</h5>
              <ul className="footer-links">
                <li><a href="#">COVID-19 and Amazon</a></li>
                <li><a href="#">Your Account</a></li>
                <li><a href="#">Returns Centre</a></li>
                <li><a href="#">100% Purchase Protection</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom text-center">
          <div className="row">
            <div className="col-12">
              <p className="mb-2">
                <a href="#" className="text-white me-3">Conditions of Use & Sale</a>
                <a href="#" className="text-white me-3">Privacy Notice</a>
                <a href="#" className="text-white">Interest-Based Ads</a>
              </p>
              <p className="mb-0">
                © 1996-2024, Amazon.com, Inc. or its affiliates
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer