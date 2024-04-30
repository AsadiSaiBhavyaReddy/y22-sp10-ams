import axios from 'axios';
import login from './login.jpg'; 
import Swal from 'sweetalert2';

export default function Login({ store }) { 
    function handleSubmit() { 
        console.log({ 
            un: document.getElementById("idun").value, 
            pw: document.getElementById("idpw").value 
        }); 
        axios.post('http://localhost:8081/check', { 
            un: document.getElementById("idun").value, 
            pw: document.getElementById("idpw").value 
        }).then((response) => { 
            console.log(response.data); 
            if (response.data !== "fail") { 
                store.dispatch({ "type": "login", "data": { "un": response.data.name, "role": response.data.role } }); 
                // Show login successful popup
                Swal.fire({
                    title: "Login Successful",
                    icon: "success"
                });
                // Set timeout for automatic logout after 1 minute (60000 milliseconds)
                setTimeout(() => {
                    store.dispatch({ "type": "logout" }); // Dispatch logout action
                    Swal.fire({
                        title: "Logged out due to inactivity",
                        icon: "info"
                    });
                }, 60000); // 1 minute
            } else {
                // Show login failed message
                Swal.fire({
                    title: "Login Unsuccessful",
                    icon: "error"
                });
            }
        }); 
    } 

    function handleMouseOver() {
        document.getElementById("idlogin").style.boxShadow = "10px 10px 15px grey";
    }
    
    function handleMouseLeave() {
        document.getElementById("idlogin").style.boxShadow = "0px 0px 0px grey";
    }

    return(
        <div id="idlogin" className="login-form" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <p style={{ textShadow: "1px 2px 2px red, -1px -2px 2px yellow", fontSize: "25px" }}>Login Page</p> <br/>
            username: <input type="text" name="un" id="idun" /> <br/><br/>
            password: <input type="password" name="pw" id="idpw" /><br/><br/><br/>
            <button onClick={handleSubmit}> Login </button>
        </div>
    );
}