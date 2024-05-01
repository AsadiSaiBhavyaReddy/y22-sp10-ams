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
        <div>
            <div className="login-container">
                <div id="idlogin" className="login-form" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                    <p style={{ fontSize: "25px", marginTop: "-20px" }}>Login Page</p> <br />
                    Username: <input type="text" name="un" id="idun" /> <br /><br />
                    Password: <input type="password" name="pw" id="idpw" /><br /><br /><br />
                    <button onClick={handleSubmit}> Login </button>
                </div>
            </div>
            <div className="note-container">
                <div className="note-box">
                    <p>Note: The symbol on the right bottom selected changes to dark theme</p>
                </div>
            </div>
            <style jsx>{`
                .login-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .login-form {
                    margin-top: -15vh;
                    box-shadow: 0px 0px 0px grey; /* Initial shadow */
                    transition: box-shadow 0.3s ease; /* Transition for smooth change */
                }

                .login-form:hover {
                    box-shadow: 10px 10px 15px grey; /* Shadow on hover */
                }

                .note-container {
                    display: flex;
                    justify-content: center;
                    margin-top: -210px;
                }

                .note-box {
                    border: 1px solid #ccc;
                    padding: 10px; /* Adjusted padding */
                    border-radius: 5px;
                    width: 80%;
                }

                .note-box p {
                    text-align: center;
                    font-size: 16px;
                    color: black;
                }
            `}</style>
        </div>
    );
}
