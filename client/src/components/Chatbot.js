import { useDispatch, useSelector } from "react-redux";
import { setIsMinimized } from "../store/layout";
import { useState } from "react";

const Chatbot = () => {

    const dispatch = useDispatch()
    const isMinimized = useSelector(state => state.layout.isMinimized)
    const [userInput, setUserInput] = useState("");

    const [chatMessages, setChatMessages] = useState([
      { type: "user", text: "Hello, Ayurmitram!" },
      { type: "bot", text: "Hi there! How can I assist you today?" },
    ]);


    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = () => {
        const newUserMessage = { type: "user", text: userInput };
        setChatMessages([...chatMessages, newUserMessage]);
        setUserInput("");
    };

    const toggleChatbot = () => {
        dispatch(setIsMinimized(!isMinimized))
    }

    return (
        <div className="bg-white border-gray-300 rounded-lg overflow-y-auto w-full h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-semibold font-opensans mb-0">
                    AyurMitram Chatbot
                </h3>

                <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={toggleChatbot}
                >
                    {isMinimized ? "Maximize" : "Minimize"}
                </button>
            </div>

            {!isMinimized && (
                <div className="flex flex-col space-y-2">
                {chatMessages.map((message, index) => (
                    <div
                    key={index}
                    className={
                        message.type === "user"
                        ? "p-2 text-right text-white"
                        : "p-2 text-left"
                    }
                    style={{
                        backgroundColor:
                        message.type === "user" ? "#539C52" : "#F5F5F5",
                        borderRadius: "12px",
                        width: "fit-content",
                        marginLeft: message.type === "user" ? "auto" : "0",
                        marginRight: message.type === "user" ? "0" : "auto",
                    }}
                    >
                    {message.text}
                    </div>
                ))}

                <div className="mt-2 flex">
                    <input
                    type="text"
                    placeholder="Type your message..."
                    className="border rounded-xl p-2 flex-1 mr-2 outline-none"
                    value={userInput}
                    onChange={handleUserInput}
                    />
                    <button
                    className="bg-ayurgreen text-white p-2 rounded-xl"
                    onClick={handleSendMessage}
                    >
                    Send
                    </button>
                </div>
                </div>
            )}
        </div>
    )
}

export default Chatbot