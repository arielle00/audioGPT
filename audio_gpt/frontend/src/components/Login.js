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

    const fixedInputClass = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ";

    return (
        <div>
            <form className="mt-8 space-y-6">
                <div className="-space-y-px">
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
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amethyst hover:bg-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                    onSubmit={handleSubmit}
                >
                    Login
                </button>
            </form>

            <div className="flex justify-center items-center mt-20">
                <a href="/signup"
                    className="font-medium text-blue-500 hover:underline"
                >
                    Click here to sign up
                </a>
            </div>
        </div>
    );
}

export default Login;
