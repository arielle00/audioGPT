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
    labelFor:"password",
    id:"password",
    name:"password",
    type:"text",
    autoComplete:"password",
    isRequired:true,
    placeholder:"Password Reset",
    text: "Password Reset"   
},
{
    labelText:"Langchain Key",
    labelFor:"langchainkey",
    id:"langchainkey",
    name:"langchainkey",
    type:"text",
    autoComplete:"langchainkey",
    isRequired:true,
    placeholder:"Langchain Key",
    text: "Langchain Key"   
},]


function Settings() {
    const token =  localStorage.getItem('authToken');
    const [notification, setNotification] = useState({ message: ''});

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

    const changePassData = {password: settingsState.password,}
    const changeKeyData = {apikey: settingsState.apikey,}
    const changeLangchainData = {langchainkey: settingsState.langchainkey,}

    const handleClick = async (text) => {

        if (text === 'Password Reset') {
            try {
                const response = await fetch('/api/changePass', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(changePassData),
                });
          
                if (response.ok) {
                    setSettingsState(prevState => ({
                        ...prevState,
                        password: "" // Reset the password field
                    }));
                    setNotification({ message: 'Password changed'});
                    setTimeout(() => setNotification(""), 2500);
                } else {
                  console.error('Error submitting data');
                }
            } 
            catch (error) {
                console.error('Error:', error);
            }
        } 
        
        else if (text==="API Key Reset"){
            try {
                const response = await fetch('/api/changeKey', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(changeKeyData),
                });
          
                if (response.ok) {
                    setSettingsState(prevState => ({
                        ...prevState,
                        apikey: "" 
                    }));
                    setNotification({ message: 'API Key changed'});
                    setTimeout(() => setNotification(""), 2500);
                  
                } else {
                  console.error('Error submitting data');
                }
            } 
            catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            try {
                const response = await fetch('/api/changeLangchain', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(changeLangchainData),
                });
          
                if (response.ok) {
                    setSettingsState(prevState => ({
                        ...prevState,
                        langchainkey: "" 
                    }));
                    setNotification({ message: 'Langchain Key changed'});
                    setTimeout(() => setNotification(""), 2500);
                  
                } else {
                  console.error('Error submitting data');
                }
            } 
            catch (error) {
                console.error('Error:', error);
            }
        }
    };

    
    
    const fixedInputClass = "bg-vanilla appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brown focus:border-brown focus:z-10 sm:text-sm ";
    
    return(
        <div className="flex text-white flex-col items-center justify-center bg-gray h-screen">
            <h1 className="text-3xl pb-10 pt-36 text-gray-600 font-bold"> Settings </h1>
            <div className="mt-8 space-y-6" style={{ width: '100%', maxWidth: '400px' }}>
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
                                onClick={() => handleClick(field.text)}
                            >
                                {field.text}
                            </button>
                            <div className="mt-4"></div>
                        </div>
                        
                    ))}
                </div>
                
                {(notification.message ==='Password changed' || notification.message ==='API Key changed' || notification.message ==='Langchain Key changed') && (
                    <div
                    className={`fixed flex text-white p-2 rounded-lg shadow-lg transition-opacity duration-500 opacity-100 bg-green-500`}>
                        {notification.message}
                    </div>
                )}

            </div>
        </div>
    )
}


export default Settings;
