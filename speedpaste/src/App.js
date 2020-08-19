import React, { useState } from 'react';
import { Route } from "react-router";
import axios from "axios";

import './Styles/App.css';
import Copy from "./Components/Copy";

function App() {
    const [pastedText, setPastedText] = useState("");
    const [text, setText] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false)
    const [link, setLink] = useState("")
    return (
        <div style={{textAlign: "center"}}>
            <h1>Welcome to SpeedPaste <i className="icon icon-2x icon-copy"></i></h1>
            <Route exact path="/">
                <h2> Are you copying or pasting?</h2>
                <div className="container">
                    <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <i class="fas fa-copy fa-6x"></i><i class="fas fa-paste fa-6x"></i>
                    </div>
                    <div>
                        <button className="column col-4 btn btn-primary" onClick={() => window.location = "/copying"}>Copying</button>
                        <button className="column col-4 btn btn-primary" onClick={() => window.location = "/pasting"}>Pasting</button>
                    </div>
                
                </div>
            </Route>
            <Route exact path="/pasting">
                {pastedText === "" ? 
                    <form onSubmit={e => {
                            e.preventDefault();
                            setPastedText(text);
                            axios
                                .post("https://speedpaste.herokuapp.com/pasting", { text: `${pastedText}` })
                                .then(res => {
                                    setToken(res.data.token);
                                    setLink(res.data.link);
                                    setLoading(false);
                                })
                        }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <textarea name="pastedtext" id="pastedtext" cols="30" rows="8" placeholder="Paste your text here!" className="column col-8" onChange={() => setText(document.getElementById("pastedtext").value)}></textarea>
                        <button className="btn btn-primary">Submit</button>
                    </form> : loading ? 
                        <div><img src="https://i.imgur.com/vOpj1aC.gif" alt="loading"/></div> : 
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p>Here is your token and shareable link!</p>
                            <input style={{width: "50%"}} type="text" value={token} disabled />
                            <a href={link}>{link}</a>
                        </div>
                    
                }
                <h2>Trying to copy? Click <a href="/copying">here!</a></h2>
            </Route>
            <Route exact path="/copying">
                <form onSubmit={e => {
                        e.preventDefault();
                        window.location = `/copying/${token}`
                    }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p><i class="fas fa-lock fa-10x"></i></p>
                    <input placeHolder="Paste your token, here!" type="text" id="token" onChange={() => setToken(document.getElementById("token").value)} />
                    <button className="btn btn-primary">Submit</button>
                </form>
                <h2>Trying to paste some text? Click <a href="/pasting">here!</a></h2>
            </Route>
            <Route path="/copying/:token" component={Copy} />
        </div>
    );
}

export default App;
