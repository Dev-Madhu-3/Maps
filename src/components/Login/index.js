import './index.css'
import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import Cookies from "js-cookie"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const isUserLogin = Cookies.get("jwtToken")


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch("https://mapsappbackend-d2kk.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()
            Cookies.set("jwtToken", data.token, { expires: 30 })
            navigate("/dashboard")
            setUsername("")
            setPassword("")
        } catch (err) {
            alert("Invalid credentials")
        }

    }



    return (
        <>
            {isUserLogin ? <Navigate to='/dashboard' /> : <div className='login-container'>
                <div className="login-card">
                    <h1 className="login-title">Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" value={username} id="username" onChange={(e) => setUsername(e.target.value)} required />
                            <div className="error-message">Please enter your username</div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" required />
                            <div className="error-message">Please enter your password</div>
                        </div>

                        <div className="error-message" id="wrong-password">
                            Wrong username or password
                        </div>

                        <button onClick={handleLogin} type="submit" className="login-btn">Sign In</button>
                    </form>
                </div>
            </div>}
        </>

    )
}

export default Login
