import {Header} from "./header/Header";
import React from "react";

export default function ComponentError(props: {msg: string}) {
    return <div className='App-100height'>
        <Header/>
        <div className='App-center'>
            {props.msg}
        </div>
    </div>
}