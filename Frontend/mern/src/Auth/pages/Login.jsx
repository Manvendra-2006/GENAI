import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
const Login = () => {
    const navigate = useNavigate()
    const { User, loading, handleRegister, handleLogOut, handleLogin } = useAuth()

    const [formData, setformData] = useState({
        email: "",
        password: ""
    })
    function handleSubmit(e) {
        e.preventDefault()
        handleLogin(formData)
        navigate("/")
        console.log(formData)
    }
    function handleChange(e) {
        const { value, name } = e.target
        setformData((prev) => ({ ...prev, [name]: value }))
    }
    if (loading) {
        return (<div><h1>Loading.............</h1></div>)
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Email</label>
                <input type="text" placeholder='Enter Email' name='email' value={formData.email} onChange={handleChange} />
                <br />
                <br />
                <label htmlFor="">Password</label>
                <input type="password" placeholder='Enter Password' name='password' value={formData.password} onChange={handleChange} />
                <br />
                <br />
                <button type='submit'>Login</button>
            </form>
            <h1>Don't have a account <Link to="/signup">Register</Link></h1>
        </div>
    )
}

export default Login