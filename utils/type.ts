export interface ModalProps {
    onToggle:(value:boolean)=>void
}


// API Input Props

export interface RegisterProps{
    name:string
    username:string 
    email:string 
    password:string
}

export interface LoginProps {
    username:string 
    password : string 
}

export interface ApiError extends Error {
    response?: {
        data?: {
            message: string;
        };
        status?: number;
        statusText?: string;
    };
}
