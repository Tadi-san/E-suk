import axios from "axios"
import { useContext, useEffect } from "react"
import { UserContext } from "./usercontext"

export default function Saved(){
const {user} = useContext(UserContext)
    useEffect(()=>{
        axios.get('/saved').then()
    }, [user.id])
    return(<div>

    </div>)
}