import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
const SignUp = () => {
    const navigate = useNavigate()
    const { User, loading, handleRegister, handleLogOut, handleLogin } = useAuth()
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: ""
    })
    function handleChange(e) {
        const { value, name } = e.target
        setformData((prev) => ({ ...prev, [name]: value }))
    }
    function handleSubmit(e) {
        e.preventDefault()
        handleRegister(formData)
        navigate("/login")
    }
    if (loading) {
        return (<div><h1>Loading.......</h1></div>)
    }
    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Enter name' name='name' value={formData.name} onChange={handleChange} />
                <br />
                <br />
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
            <h1>Already Have a account <Link to="/login">SignIn</Link></h1>
        </div>
    )
}

export default SignUp