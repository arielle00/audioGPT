import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const loginFields = [
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address"   
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password"   
    }
];



const handleSignUp=(e)=>{
    e.preventDefault();
}


function Login() {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });

    const [loginSuccess, setLoginSuccess] = useState(
        true
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit= async (e) =>{
        e.preventDefault();
        
        
        const loginData = {
            // Assuming you want to send the username, adjust if needed
            email: formState.email,
            password: formState.password,
        };
        
        try {
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginData),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              navigate('/home')
            } else {
              console.error('Error submitting data');
              console.log(response);
              setLoginSuccess(false);
            }
        } 
        catch (error) {
            console.error('Error:', error);
        }
    }

    const fixedInputClass = "bg-vanilla appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ";

    return (
        <div className="bg-gray text-white flex flex-col items-center justify-center h-screen">
            <div className="flex justify-center items-center bg-gray">
                <p className="underline decoration-wavy text-raisin normal-case font-mono font-bold text-5xl bg-gray">
                AudioGPT
                </p> 
            </div>
            
           
            <h1 className="text-2xl pt-36 font-bold">Log in</h1>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <div className="space-y-2">
                    {loginFields.map((field) => (
                        <input
                            key={field.id}
                            onChange={handleChange}
                            value={formState[field.name]}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            required={field.isRequired}
                            className={fixedInputClass}
                            placeholder={field.placeholder}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="group bg-brown relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-raisin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amythest mt-10"
                >
                    Login
                </button>
            </form>
            
            <div className="pt-5">
                {!loginSuccess && <div class="flex ease-out duration-100 transition-opacity opacity-100 items-center px-4 p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-medium">Incorrect username or password!</span>
                    </div>
                </div> }
            </div>

            <div className="flex justify-center items-center mt-20">
                <a href="/signup"
                    className="font-medium text-blue-700 hover:underline"
                >
                    Click here to sign up
                </a>
            </div>
        </div>
    );
}

export default Login;
