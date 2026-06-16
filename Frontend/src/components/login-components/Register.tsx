import React, { useState } from 'react'

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [repassword, setRepassword] = useState("")

  function createUsername(name: string) {
    setUsername(name)
  }

  function createPassword(pass: string) {
    setPassword(pass)
  }

  function reEnterPassword(pass: string) {
    setRepassword(pass)
  }

  function handleSubmit() {
    console.log(username)
    console.log(password)
    console.log(repassword)
  }

  return (<>
    <div>Register As User Here</div>
    <label>Sisestage kasutajanimi:</label><br></br>
    <input onChange={(e) => { createUsername(e.target.value) }} autocomplete="off" id='username' name='username' type='text'></input><br /><br />
    <label>Sisestage Salasõna:</label><br></br>
    <input onChange={(e) => { createPassword(e.target.value) }} id='password' name='password' type='password'></input><br /><br />
    <label>Sisestage Salasõna Uuesti:</label><br></br>
    <input onChange={(e) => { reEnterPassword(e.target.value) }} id='password' name='password' type='password'></input><br /><br />
    <button onClick={() => { handleSubmit() }}>Registreeri Kasutaja</button>
  </>
  )
}

export default Register