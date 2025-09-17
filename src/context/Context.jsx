import run from "../config/gemini"; // ✅ Default import
import { createContext, useState, useEffect } from "react"; // ✅ Import useEffect

export const Context = createContext();



const ContextProvider = ({ children }) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")


    const delayPara = (index, nextword) => {
        setTimeout(() => {
            setResultData(prev => prev + nextword)
            //this function will next with prev text
            //ex->prev->how  AND next ->are you , final word will be ->how are you
            // console.log(resultData)
        }, 75*index)
    }//typing effect

    const onSent = async (prompt) => {
        setResultData('');
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompts(prev => [...prev, input])
        // console.log("BEFORE IS RUNNING")
       

        //Execution pauses at await, and code after async will be executed 
        try {
            let response = await run(input); // ✅ Await the response

            // console.log("Response received:", response);
            // console.log("Response type:", typeof response);

            // If response is a function, call it
            if (typeof response === "function") {
                response = response(); // ✅ Convert function to actual response
                console.log("Function response:", response);
            }

            // Ensure response is a string
            if (typeof response !== "string") {
                throw new Error("Invalid response type: " + typeof response);
            }


          
            let responseArray = response.split('**'); // ✅ Now it's safe to split
            console.log(responseArray);
            
            let newResponse = '';
            // keep this newResponse declare otherwise it will give undefined
            // Ex->let newResponse;WRONG**
            // Ex->let newResponse='';right**

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                    // console.log(newResponse)
                } else {
                    newResponse += `<b>${responseArray[i]}</b>`; // ✅ Correct closing tag
                    console.log(newResponse)
                }
            }

            console.log(newResponse);
            
            let newResponse2 = newResponse.split("*").join("</br>");
            //to move to next line
            console.log(newResponse2)

            let newResponseArray = newResponse2.split(" ");
            //for typing effect

            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ")
            }
        } catch (error) {
            console.error("Error in onSent:", error);
            setResultData(`Error: ${error.message}`);
        }

        setLoading(false);

        setInput('');
    };


    // The rest of your app continues running, handling UI updates, events, and other asynchronous tasks.
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        // newchat

    };

    useEffect(() => {
        console.log("Component re-rendered");
    }, [resultData]);



    return (
        <Context.Provider value={contextValue}>
            {children} {/* ✅ Fixed spelling */}
        </Context.Provider>
    );
};

export default ContextProvider; // ✅ Default 