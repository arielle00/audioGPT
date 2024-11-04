## AudioGPT

An application to feed any kind of audio file like lectures or podcasts and extract insights from them using a ChatGPT-like interface. The application was built using React, Django, Python and PostgreSQL

## Project Status

This project is currently fully functional. Users may sign up and log in to their accounts with their OpenAI API key and start uploading documents to the webpage. We are still trying to extend the functionality to allow users to upload document files

## Project Screen Shot(s)

![image](https://github.com/user-attachments/assets/5f507774-9f3e-4b7c-822e-dffae2e3aa48)

![image](https://github.com/user-attachments/assets/989c282b-41d1-49f5-a87c-bbf29ee07d3c)


## Installation and Setup Instructions

The webpage has been deployed at [my-app-two-opal.vercel.app  ](https://my-app-two-opal.vercel.app/)

## Reflection

This was a month long project Arielle and Manan completed in order to gain better hands on experience with web development technologies like React, Django and PostgreSQL

RAG appears to be a very popular topic as of late and we wanted to experiment using LLMs and vector databases. This seemed like a great project to combine traditional software development and AI techniques. Furthermore, we also wanted a way to summarise youtube videos and podcasts and we believed that with a combination of all sources of data, the LLM could provide unique insight that a regular ChatGPT would not be able to do

One of the biggest challenges with this project was trying to set up the PGVector database with AWS. There were plenty of dependency issues we had to sift through. We also had challenges setting up our backend architecture to query all relevant documents efficiently

At the end of the day, the technologies implemented in this project are React, React-Router, Redux, PostgreSQL, PGVector, Django, Python, Amazon RDS and a significant amount of VanillaJS, JSX, and CSS. We chose to use Webpack.js.config and TailwindCSS to help make styling more efficient and scalable. In the next iteration of the project we wish to include the opportunity to use more LLMs and the chance to upload documents and not just audio files
