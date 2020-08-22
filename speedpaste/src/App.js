import React, { useState } from 'react';
import { Route } from "react-router";
import axios from "axios";

import './Styles/App.css';
import Copy from "./Components/Copy";
import walloftext from "./wall-of-text.png";
function App() {
    const [pastedText, setPastedText] = useState("");
    const [text, setText] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false)
    const [link, setLink] = useState("")
    return (
        <div style={{textAlign: "center"}}>
            <img className="background" src={walloftext} alt="wall of text in the background"/>
            <h1>Welcome to SpeedPaste <i className="icon icon-2x icon-copy"></i></h1>
            <Route exact path="/">
                <h2> Are you copying or pasting?</h2>
                <div className="container">
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <i className="fas fa-copy fa-6x column col-4"></i><i className="fas fa-paste fa-6x column col-4"></i>
                    </div>
                    <div>
                        <button style={{marginTop: "2%"}} className="column col-4 btn btn-primary" onClick={() => window.location = "/copying"}>Copying</button>
                        <button style={{marginTop: "2%"}} className="column col-4 btn btn-primary" onClick={() => window.location = "/pasting"}>Pasting</button>
                    </div>
                
                </div>
            </Route>
            <Route exact path="/pasting">
                {pastedText === "" ? 
                    <form onSubmit={e => {
                            e.preventDefault();
                            setPastedText(text);
                            setLoading(true);
                            axios
                                .post("https://speedpaste.herokuapp.com/pasting", {text})
                                .then(res => {
                                    setToken(res.data.token);
                                    setLink(res.data.link);
                                    setLoading(false);
                                })
                        }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <textarea name="pastedtext" id="pastedtext" cols="30" rows="8" placeholder="Paste your text here!" value={text} className="column col-8" onChange={() => setText(document.getElementById("pastedtext").value)}></textarea>
                        <button className="btn btn-primary">Submit</button>
                    </form> : loading ? 
                        <div><img src="https://i.imgur.com/vOpj1aC.gif" alt="loading"/></div> : 
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p>Here is your token and shareable link!</p>
                            <textarea className="column col-8" style={{width: "50%"}} type="text" value={token} cols={30} rows={8} disabled />
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
                    <p><i className="fas fa-lock fa-10x"></i></p>
                    <textarea className="column col-8" placeholder="Paste your token, here!" type="text" id="token" cols="30" rows="8" onChange={() => setToken(document.getElementById("token").value)} />
                    <button className="btn btn-primary">Submit</button>
                </form>
                <h2>Trying to paste some text? Click <a href="/pasting">here!</a></h2>
            </Route>
            <Route path="/copying/:token" component={Copy} />
        </div>
    );
}

export default App;
