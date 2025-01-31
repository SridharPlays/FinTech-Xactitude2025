import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div>
        <footer>
		<div class="footer-container">
			<div class="footer-section">
				<h3>Essential Links</h3>
				<ul>
					<li><a href="#">Home</a></li>
					<li><a href="#">Dashboard</a></li>
					<li><a href="#">About Us</a></li>
					<li><a href="#">Contact Us</a></li>
					<li><a href="#">FAQ</a></li>
				</ul>
			</div>

			<div class="footer-section">
				<h3>Legal & Policies</h3>
				<ul>
					<li><a href="#">Privacy Policy</a></li>
					<li><a href="#">Terms & Conditions</a></li>
					<li><a href="#">Data Security</a></li>
					<li><a href="#">Cookie Policy</a></li>
				</ul>
			</div>

			<div class="footer-section">
				<h3>Support & Community</h3>
				<ul>
					<li><a href="#">Help Center</a></li>
					<li><a href="#">User Guide</a></li>
					<li><a href="#">Community Forum</a></li>
					<li><a href="#">Report an Issue</a></li>
				</ul>
			</div>

			<div class="footer-section">
				<h3>Follow Us</h3>
				<ul class="social-links">
					<li><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
					<li><a href="#"><ion-icon name="logo-twitter"></ion-icon></a></li>
					<li><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
					<li><a href="#"><ion-icon name="logo-linkedin"></ion-icon></a></li>
					<li><a href="#"><ion-icon name="logo-youtube"></ion-icon></a></li>
				</ul>
			</div>
		</div>
		<p class="footer-note">
			&copy; Made by Christite.
		</p>
	</footer>
    </div>
  )
}

export default Footer