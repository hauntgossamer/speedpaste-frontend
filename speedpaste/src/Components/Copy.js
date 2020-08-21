import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Copy({match}) {
    const [text,  setText] = useState("")
    useEffect(() => {
        const token = window.location.href.split('/').slice(4)[0]
        axios
            .get(`https://speedpaste.herokuapp.com/copy/${token}`)
            .then(res => setText(res.data.text))
            .catch(err => console.log(err))
    },[match.params])
    return (
        text ?     
            <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <textarea className="columns col-8" name="tobecopied" id="tobecopied" cols="30" rows="8" value={text} disabled></textarea>
                <h2>Trying to paste some text? Click <a href="/pasting">here!</a></h2>
            </div> :
            <div>
                <i className="fas fa-unlink fa-10x"></i>
                <h2>
                    You entered or navigated to an invalid token!
                </h2>
                <h2>
                    Try another token <a href="/copying">here</a> or paste something <a href="/pasting">here</a>!
                </h2>
            </div>
    )
}
