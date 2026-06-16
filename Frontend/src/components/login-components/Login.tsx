import React, { useState } from 'react'

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
            <div>Log in here:</div>
            <br />

            <label>Kasutajanimi:</label><br />
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => createUsername(e.target.value)} autoComplete="off" id="username" name="username" type="text" /><br /><br />

            <label>Salasõna:</label>
            <br />
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => createPassword(e.target.value)} id="password" name="password" type="password" /><br /><br />

            <button onClick={handleSubmit}>Login</button>
        </>
    )
}

export default Login