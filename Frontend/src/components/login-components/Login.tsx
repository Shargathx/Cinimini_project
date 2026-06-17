import React, { useState } from 'react'
import "./Login.css"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function createUsername(name: string) {
        setUsername(name)
    }

    function createPassword(pass: string) {
        setPassword(pass)
    }

    function handleSubmit() {
        console.log(username)
        console.log(password)
    }

    return (
        <>
            <div className="login-page">
                <div className="login-container">
                    <div className='login-title'>Logi sisse</div>
                    <br />

                    <label className='user-title'>Kasutajanimi</label><br />
                    <input className="user-input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => createUsername(e.target.value)} autoComplete="off" id="username" name="username" type="text" /><br /><br />

                    <label className='password-title'>Salasõna</label>
                    <br />
                    <input className="password-input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => createPassword(e.target.value)} id="password" name="password" type="password" /><br /><br />

                    <button className="login-button" onClick={handleSubmit}>Logi sisse</button>
                </div>
            </div>
        </>
    )
}

export default Login