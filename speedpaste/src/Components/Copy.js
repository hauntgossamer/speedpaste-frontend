import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Copy({match}) {
    const [text,  setText] = useState("")
    useEffect(() => {
        axios
            .get(`https://speedpaste.herokuapp.com/copy/${match.params.token}`)
            .then(res => setText(res.data.text))
    },[match.params])
    return (
        text ?     
            <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <textarea className="columns col-8" name="tobecopied" id="tobecopied" cols="30" rows="8" value={text} disabled></textarea>
                <h2>Trying to paste some text? Click <a href="/pasting">here!</a></h2>
            </div> :
            <div>
                <i class="fas fa-unlink fa-10x"></i>
                <h2>
                    You entered or navigated to an invalid token!
                </h2>
                <h2>
                    Try another token <a href="/copying">here</a> or paste something <a href="/pasting">here</a>!
                </h2>
            </div>
    )
}
