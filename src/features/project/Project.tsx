import React from "react";
import {useParams} from "react-router-dom";

export function Project() {
    const { id } = useParams()
    return <p>{id}</p>
}