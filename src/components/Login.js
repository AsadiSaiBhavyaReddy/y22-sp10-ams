import Swal from 'sweetalert2';

export default function Login({ store }) {
    function handleSubmit() {
        console.log({
            un: document.getElementById("idun").value,
            pw: document.getElementById("idpw").value
        });
        // Simulate login process
        const isSuccess = true; // Simulate successful login
        if (isSuccess) {
            // Sample response
            const fakeResponse = { name: "John Doe", role: "admin" };
            store.dispatch({ "type": "login", "data": { "un": fakeResponse.name, "role": fakeResponse.role } });
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
    }

    function handleMouseOver() {
        document.getElementById("idlogin").style.boxShadow = "10px 10px 15px grey";
    }

    function handleMouseLeave() {
        document.getElementById("idlogin").style.boxShadow = "0px 0px 0px grey";
    }

    return (
        <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> {/* Centering the container */}
            <div id="idlogin" className="login-form" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} style={{ marginTop: "-15vh" }}> {/* Adjusted marginTop */}
                <p style={{  fontSize: "25px", marginTop: "-20px" }}>Login Page</p> <br />
                Username: <input type="text" name="un" id="idun" /> <br /><br />
                Password: <input type="password" name="pw" id="idpw" /><br /><br /><br />
                <button onClick={handleSubmit}> Login </button>
            </div>
        </div>
    );
}
