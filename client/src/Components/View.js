import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "../Constant";
import Interview from './Interview'

const View = () => {
    const url = Link.interviews
    const [ loading, setloading ] = useState(true)
    const [ items, setitem ] = useState([])

    useEffect( ()=>{
        const fetch = async ()=>{
            try {
                const Axios = axios.create({baseURL : url})
                const result = await Axios.get()
                setloading(false)
                setitem(result.data)
            } catch (e) {
                console.log('error')
            }
        }
        fetch()
    },[])
    return loading? <div>
                        loading...
                    </div> : (
        <div>
            <h1 style={{fontFamily: "arial" , color : "royalblue"}}>All Interviews</h1><hr/>
            {items.map( (item,index) =>
            <Interview key = {index} item = {item} /> 
            )}
        </div>
    )
}

export default View;