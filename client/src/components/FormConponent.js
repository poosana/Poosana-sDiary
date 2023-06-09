import {useState} from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import { getUser } from "../services/authorize"
import { getToken } from "../services/authorize"

const FormComponent=()=>{
    //input
    const [state,setState] = useState({
        title:"",
        content:"",
        author:getUser()
    })

    const {title,content,author} = state

    //กำหนดค่าให้กับ state
    const inputValue = name=>event=>{
        //แสดงค่าในช่องกรอกข้อมูล
        setState({...state,[name]:event.target.value})
    }

    const submitForm = (e) =>{
        e.preventDefault(); 
        console.log("API URL",process.env.REACT_APP_API)
        axios.post(`http://localhost:5500/api/create`,{title,content,author},{
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        }).then(response=>{
            Swal.fire(
                'แจ้งเตือน',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
            )
            //เคลียร์ช่อง input
            setState({...state,title:"",content:"",author:""})
        }).catch(err=>{
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        })
    }

    return(
        <div className = "container p-5">
            <NavbarComponent></NavbarComponent>
            <h1>เขียนบทความ</h1> 
            <form onSubmit = {submitForm}>
                <div className = "form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className = "form-control" value = {title} onChange={inputValue("title")}/>
                </div>
                <div className = "form-group">
                    <label>เนื้อหาบทความ</label>
                    <textarea type="text" className = "form-control" value = {content} onChange={inputValue("content")}/>
                </div>
                <div className = "form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className = "form-control" value = {author} onChange={inputValue("author")}/>
                </div><br></br>
                <input type ="submit" value="บันทึก" className = "btn btn-primary"></input>
            </form>
            
        </div>
    )
}

export default FormComponent