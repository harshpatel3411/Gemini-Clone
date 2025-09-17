import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from "./context/Context"; // ✅ Default import works fine



createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)


// assignments->
// learn about:-
// 1.inline-flex,
// 2.how to add multiple value into state with this syntax setExtended(prev=>!prev)
//3.what is flex-1
//4.=>
// main .greet span{
//   background: -webkit-linear-gradient(16deg,#4b90ff,#ff5546);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color:transparent ;
// }

