import { Fragment } from "react"
import { Link } from "react-router-dom";
 
function NavBar(){
   return(
    <Fragment>
        <nav class="navbar navbar-dark bg-dark">
    
            <Link to='/home'> Home</Link>
            <Link to='/login'> Login</Link>
            <Link to='/register'> Register</Link>
        
        </nav>
        
    </Fragment>

   )
}

export default NavBar