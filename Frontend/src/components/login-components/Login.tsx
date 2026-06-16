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

    return (<>
        <div>Log in here:</div><br />
        <label>Kasutajanimi:</label><br></br>
        <input onChange={(e) => { createUsername(e.target.value) }} autocomplete="off" id='username' name='username' type='text'></input><br /><br />
        <label>Salasõna:</label><br></br>
        <input onChange={(e) => { createPassword(e.target.value) }} id='password' name='password' type='password'></input><br /><br />
        <button onClick={() => { handleSubmit() }}>Login</button>
    </>
    )
}

export default Login