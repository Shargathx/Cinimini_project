import React, { useState } from 'react'
import './Register.css'

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
    <div className='register-page'>
      <div className='register-container'>
        <div className='register-title'>Registreeri kasutajaks</div>

        <label>Sisestage kasutajanimi:</label>
        <input className='register-user-input' onChange={(e: React.ChangeEvent<HTMLInputElement>) => createUsername(e.target.value)} autoComplete="off" id="username" name="username" type="text" /><br />

        <label>Sisestage Salasõna:</label>
        <input className='register-password-input' onChange={(e: React.ChangeEvent<HTMLInputElement>) => createPassword(e.target.value)} id="password" name="password" type="password" /><br />

        <label>Sisestage Salasõna Uuesti:</label>
        <input className='retype-password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => reEnterPassword(e.target.value)} id="password" name="password" type="password" /><br />

        <button className='submit-button' onClick={() => { handleSubmit() }}>Registreeru Kasutaja</button>
      </div>
    </div>
  </>
  )
}

export default Register