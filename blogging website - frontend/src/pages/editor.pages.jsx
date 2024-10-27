import { useContext, useState } from "react";
import {UserContext} from "../App.jsx"
import { Navigate } from "react-router-dom";

const Editor = () => {

    const [ editorState, setEditorState ] = useState("editor");

    let { userAuth: { access_token } } = useContext(UserContext) 


  return (
    access_token === null ? <Navigate to="/signin" /> 
    : editorState == "editor" ? <h1>Blog editor</h1> : <h1>Publish form</h1>
  )
}

export default Editor;
