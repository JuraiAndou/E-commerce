import { Fragment } from "react"
import { Link } from "react-router-dom";
 
function NavBar(props){
    const linkStyle = {
       marginLeft:"20px",
       color:"white",
       fontWeight: "bold",
       textDecoration: 'none'
    }
   return(
    <Fragment>
        <nav className="bg-dark p-4 align-items-start">
            <Link style={linkStyle} to='/home'> HOME</Link>
            {props.isAuthenticated ?(
                <Link style={linkStyle} to='/dashboard'> DASHBOARD</Link>  
            ):( 
                <Link style={linkStyle} to='/login'> LOGIN/REGISTER </Link>             
            )}
        </nav>
        
    </Fragment>

   )
}

export default NavBar