import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "../Constant";

export default function Meet(props) {
    
    const state = props.location.state 
    const [item,setItem] = useState()
    const [loading, setloading ] = useState(true)
    
    useEffect( ()=>{
        const fetch = async ()=> {
            try {
                const url = Link.joinMeet + state.id + '?email=' + state.email;
                const Axios = axios.create({baseURL : url})
                const result = await Axios.get()
                setloading(false)
                setItem(result.data)
            } catch (e) {
                console.log('error')
            }
        }
        fetch()
    },[])

    return loading? <div> loading... </div> : <div> {item}    </div> 

}