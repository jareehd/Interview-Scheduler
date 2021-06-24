import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "../Constant";
import Interview from './Interview'
import Edit from './Edit'
import Button from 'react-bootstrap/Button'

const View = () => {
    const url = Link.interviews
    const [selected ,setSelected ] = useState()
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

    const handleSelect = (item) => {
       setSelected(item)
    } 

    return loading? <div>
                        loading...
                    </div> : selected ? <Edit item={selected}/> : (
        <div>
            <h1 style={{fontFamily: "arial" , color : "IndianRed"}}> All Interviews</h1><hr/>
            {items.map( (item,index) =>
            <div>
              
              <Button variant="primary" onClick = {()=>handleSelect(item)}> Edit Interview </Button>
              <Interview key = {index} item = {item} /> 
            </div>

            )} 
        </div>
    )
}

export default View;