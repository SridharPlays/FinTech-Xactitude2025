import React from 'react'
import "./Navbar.css"
import Logo from "../assets/sus.webp"

const Navbar = () => {
  return (
    <div>
        <header class="navigation">
		<img class="logo" src={Logo} width="50px" />
		<nav class="navigation-1">
			<a href="">Home</a>
			<a href="./dashboard.html">Dashboard</a>
			<a href="">Expenses</a>
			<a href="">Budgets</a>
			<a href="">Reports</a>
		</nav>
		<nav class="navigation-2">
			<a href="">Login</a>
			<a href="">Sign Up</a>
		</nav>
	    </header>
    </div>
  )
}

export default Navbar