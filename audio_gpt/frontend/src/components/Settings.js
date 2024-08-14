import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const settingsFields=[{
    labelText:"API Key",
    labelFor:"apikey",
    id:"apikey",
    name:"apikey",
    type:"text",
    autoComplete:"apikey",
    isRequired:true,
    placeholder:"API Key",
    text: "API Key Reset"  
},
{
    labelText:"Password Reset",
    labelFor:"pass-reset",
    id:"pass-reset",
    name:"pass-reset",
    type:"text",
    autoComplete:"pass-reset",
    isRequired:true,
    placeholder:"Password Reset",
    text: "Password Reset"   
},]


function Settings() {

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSettingsState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [settingsState, setSettingsState]=useState({
        apikey: "",
        password: "",
    });

    const handleSubmit= async (e) =>{
        e.preventDefault();
        
        const settingsData = {
            apikey: settingsState.apikey,
            password: settingsState.password,
        };
        
        try {
            const response = await fetch('/api/settings', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(settingsData),
            });
      
            if (response.ok) {
              
            } else {
              console.error('Error submitting data');
            }
        } 
        catch (error) {
            console.error('Error:', error);
        }
    }
    const fixedInputClass = "bg-vanilla appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brown focus:border-brown focus:z-10 sm:text-sm ";
    
    return(
        <div className="flex text-white flex-col items-center justify-center text-6xl bg-gray h-screen">
            
            <h1 className="text-3xl pb-10 pt-36 text-gray-600 font-bold"> Settings </h1>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <div className="space-y-2">
                    {settingsFields.map((field) => (
                        <div key={field.id} className="">

                            <div className=" text-raisin text-xl mb-1"> {field.text}: </div>

                            <label htmlFor={field.id} className="sr-only">
                                {field.labelText}
                            </label>
                            <input
                                onChange={handleChange}
                                value={settingsState[field.name]}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                required={field.isRequired}
                                className={fixedInputClass}
                                placeholder={field.placeholder}
                            />
                            <button
                                type="submit"
                                className="group bg-brown relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-raisin focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amythest mt-2"
                            >
                                {field.text}
                            </button>
                            <div className="mt-4"></div>
                        </div>
                        
                    ))}
                </div>
                
            </form>

        </div>
    )
}


export default Settings;
