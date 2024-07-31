import React, { useState } from "react";

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

const handleSubmit=(e)=>{
    e.preventDefault();
    // authenticateUser();
}

const handleSignUp=(e)=>{
    e.preventDefault();
}


function Login() {
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fixedInputClass = "bg-vanilla appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ";

    return (
        <div className="bg-gray text-white flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Log in</h1>
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
                    className="group bg-brown relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-raisin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                >
                    Login
                </button>
            </form>

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
