interface ListItemProps {
  title: string;
  text: string;
}

export const listItems: ListItemProps[] = [
  {
    title: "bcrypt",
    text: "Hashing passwords securely to enhance user authentication.",
  },
  {
    title: "cors",
    text: "Enabling Cross-Origin Resource Sharing for seamless communication between the frontend and backend.",
  },
  {
    title: "dotenv",
    text: "Managing environment variables for configuration settings.",
  },
  {
    title: "express",
    text: "Building a robust and scalable backend server.",
  },
  {
    title: "joi and joi-password-complexity",
    text: "Validating and enforcing complex password requirements.",
  },
  {
    title: "jsonwebtoken",
    text: "Generating and verifying JSON Web Tokens (JWT) for user authentication.",
  },
  {
    title: "mongoose",
    text: "Interacting with MongoDB for efficient data storage and retrieval.",
  },
  {
    title: "socket.io",
    text: "Facilitating real-time communication between clients and the server.",
  },
  {
    title: "@emotion/react and @emotion/styled",
    text: "Utilizing Emotion for styling React components.",
  },
  {
    title: "@fontsource/roboto",
    text: "Incorporating the Roboto font for a clean and modern interface.",
  },
  {
    title: "@mui/material",
    text: "Leveraging Material-UI for a consistent and visually appealing UI design.",
  },
  {
    title: "axios",
    text: "Handling HTTP requests for seamless communication with the backend.",
  },
  {
    title: "quill",
    text: "Integrating the Quill editor for a feature-rich and user-friendly document editing experience.",
  },
  {
    title: "react and react-dom",
    text: "Core libraries for building React applications.",
  },
  {
    title: "react-jwt",
    text: "Simplifying JWT handling in React applications.",
  },
  {
    title: "react-router-dom",
    text: "Managing navigation within the React application.",
  },
  {
    title: "socket.io-client",
    text: "Establishing a WebSocket connection to enable real-time updates.",
  },
  {
    title: "uuid",
    text: "Generating universally unique identifiers for various purposes in the application.",
  },
];

export const selfHostedListItems: ListItemProps[] = [
  {
    title: "Self-Hosted Solution",
    text: "Users have full control over their document data and privacy by hosting the solution independently.",
  },
  {
    title: "Enhanced Security",
    text: "Implementation of bcrypt for secure password storage and JWT for user authentication ensures data security.",
  },
  {
    title: "Real-Time Collaboration",
    text: "Utilization of socket.io enables real-time collaboration features, making it suitable for collaborative document editing.",
  },
  {
    title: "Modern UI/UX",
    text: "Material-UI and Emotion provide a modern and responsive user interface for a seamless user experience.",
  },
  {
    title: "Rich Text Editing",
    text: "Integration of the Quill editor allows users to create and edit documents with various formatting options.",
  },
  {
    title: "Scalability",
    text: "The use of Node.js and Express on the backend ensures scalability to handle a growing user base.",
  },
];
