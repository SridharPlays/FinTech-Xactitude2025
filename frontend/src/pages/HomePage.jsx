import React from 'react'
import Image1 from "../assets/join-us-illustration.jpg"
import Image2 from "../assets/general-info-illustration.jpg"
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
        <section class="main-page">
		<h2>Track Your Expense</h2>
		<p>
			The ultimate expense tracker designed for <i>Homemakers.</i> Stay in
			control of your household budget, track daily expenses, and plan for the
			future-all in one place.
		</p>
	</section>
	<section class="join-us">
		<hr />
		<div class="flex-container">
			<div>
				<h2>Join US</h2>
				<h4>For Free</h4>
				<button>Join Now</button>
			</div>
			<div>
				<img src={Image1} />
			</div>
		</div>
	</section>

	<section class="general-info">
		<div class="flex-container">
			<h2>Manage Your Household Finances Easily</h2>
			<p>Take control of your daily expenses, track your budget, and save smarter with our easy-to-use expense tracker.</p>
		</div>
		<img src={Image2} />
	</section>

    </div>
  )
}

export default HomePage