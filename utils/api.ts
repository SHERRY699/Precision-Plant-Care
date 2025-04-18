import axios from 'axios'
import { LoginProps, RegisterProps } from './type'
import { useMutation, useQuery } from '@tanstack/react-query'



const API_URL=process.env.EXPO_PUBLIC_API_URL


// Post Request 

// User Register 

const Register = async (url:string,data:RegisterProps)=>{
    const resposne = await axios.post(`${API_URL}${url}`,data)
    return resposne?.data
}

export const useRegister = (url:string,data:RegisterProps) => {
    return useMutation({
        mutationKey:['register'],
        mutationFn:()=>Register(url,data)
    })
}

// User Login 

const Login = async (url:string,data:LoginProps)=>{
    const response = await axios.post(`${API_URL}${url}`,data)
    return response?.data
}

export const useLogin = (url:string,data:LoginProps)=>{
    return useMutation({
        mutationFn:()=>Login(url,data),
        mutationKey:['Login']
    })
}

// User Logout

const Logout = async (url:string,token:string)=>{
    const response = await axios.post(`${API_URL}${url}`,{},{
       headers:{
        Authorization:`Bearer ${token}`
       }
    })
    return response?.data
}

export const useLogout = (url:string,token:string)=>{
    return useMutation({
        mutationFn:()=>Logout(url,token),
        mutationKey:['Logout']
    })
}


// Get Request 

const fetchData =  async (url:string)=>{
    const response = await axios.get(`${API_URL}${url}`)
    return response?.data
}

export const useFetchData = (url:string)=>{
    return useQuery({
        queryKey:['get'],
        queryFn:()=>fetchData(url),
        refetchOnWindowFocus: true, // This will refetch the data when the window is focused
        refetchOnMount: 'always',  // This will refetch the data every time the component mounts
        enabled: !!url, // Only run the query if URL is truthy
    })
}