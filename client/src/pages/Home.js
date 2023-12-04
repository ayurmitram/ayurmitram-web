import React, { useState } from "react";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import HomeIcon from "@mui/icons-material/Home";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import InfoIcon from "@mui/icons-material/Info";
import Person3Icon from "@mui/icons-material/Person3";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import logo from "../assets/logo.svg";

const buttons = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "About", icon: <InfoIcon /> },
  { name: "Find Your Prakriti", icon: <FindInPageIcon /> },
  { name: "Results", icon: <FactCheckIcon /> },
  { name: "Consultant (Doctor)", icon: <Person3Icon /> },
  { name: "Diet Plan", icon: <RestaurantIcon /> },
  { name: "Profile", icon: <AccountCircleIcon /> },
  { name: "Logout", icon: <LogoutIcon /> },
];

export default function Home() {
  const [activeButton, setActiveButton] = useState("Home");
  const [pageName, setPageName] = useState("Home");
  const [chatOpen, setChatOpen] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { type: "user", text: "Hello, Ayurmitram!" },
    { type: "bot", text: "Hi there! How can I assist you today?" },
  ]);
  const [minimized, setMinimized] = useState(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setPageName(buttonName);
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const minimizeChat = () => {
    setMinimized(true);
    setChatOpen(false);
  };

  const maximizeChat = () => {
    setMinimized(false);
    setChatOpen(true);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    const newUserMessage = { type: "user", text: userInput };
    setChatMessages([...chatMessages, newUserMessage]);
    setUserInput("");
  };

  return (
    <>
      <div className="bg-ayurgreen p-4 text-white flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Ayurmitram Logo" className="h-8 w-8 mr-2" />
          <span className="text-3xl font-bold font-opensans">Ayurmitram</span>
        </div>
      </div>

      <div className="flex justify-between h-screen p-4 bg-[#E8EDDF]">
        <div className="flex-3 bg-[#E8EDDF] rounded-xl m-5">
          <div className="border-gray-300 rounded-lg overflow-y-auto p-4">
            <h3 className="text-3xl font-semibold font-opensans mb-6">
              Info Center
            </h3>

            <div className="flex flex-col space-y-2 font-opensans">
              {buttons.map((button) => (
                <button
                  key={button.name}
                  className={`flex items-center py-2 px-4 text-gray-800 text-left ${
                    activeButton === button.name
                      ? "bg-yellow-300"
                      : "hover:bg-yellow-300"
                  } transition duration-300 ease-in-out rounded-xl`}
                  onClick={() => handleButtonClick(button.name)}
                >
                  {button.icon}
                  <span className="ml-2">{button.name}</span>
                </button>
              ))}
              <hr className="mb-4" />
            </div>
          </div>
        </div>
        <div
          className={`flex-1 bg-white border rounded-xl shadow-xl m-5 ${
            chatOpen ? "w-1/2" : ""
          }`}
        >
          <div className="bg-white border-gray-300 rounded-lg overflow-y-auto p-4">
            <h3 className="text-3xl bg-white font-semibold font-opensans mb-6">
              {pageName}
            </h3>
            <hr className="mb-4" />
          </div>
        </div>

        {minimized ? (
          <>
            <div className="fixed bottom-4 right-4">
              <button
                className="bg-ayurgreen text-white p-4 rounded-full"
                onClick={maximizeChat}
              >
                <ChatIcon />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-grow bg-white border ml-4 rounded-xl shadow-xl m-5">
              <div className="bg-white border-gray-300 rounded-lg overflow-y-auto p-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-3xl font-semibold font-opensans mb-0">
                    AyurMitram Chatbot
                  </h3>

                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={minimizeChat}
                  >
                    {chatOpen ? "Minimize" : "Maximize"}
                  </button>
                </div>

                {chatOpen && (
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
            </div>
          </>
        )}
      </div>
    </>
  );
}
