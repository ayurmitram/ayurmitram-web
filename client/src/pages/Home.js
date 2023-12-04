import Layout from "../components/Layout";

export default function Home() {
  // const [activeButton, setActiveButton] = useState("Home");
  // const [pageName, setPageName] = useState("Home");
  // const [chatOpen, setChatOpen] = useState(true);
  // const [userInput, setUserInput] = useState("");
  // const [chatMessages, setChatMessages] = useState([
  //   { type: "user", text: "Hello, Ayurmitram!" },
  //   { type: "bot", text: "Hi there! How can I assist you today?" },
  // ]);
  // const [minimized, setMinimized] = useState(false);

  // const handleButtonClick = (buttonName) => {
  //   setActiveButton(buttonName);
  //   setPageName(buttonName);
  // };

  // const toggleChat = () => {
  //   setChatOpen(!chatOpen);
  // };

  // const minimizeChat = () => {
  //   setMinimized(true);
  //   setChatOpen(false);
  // };

  // const maximizeChat = () => {
  //   setMinimized(false);
  //   setChatOpen(true);
  // };

  // const handleUserInput = (e) => {
  //   setUserInput(e.target.value);
  // };

  // const handleSendMessage = () => {
  //   const newUserMessage = { type: "user", text: userInput };
  //   setChatMessages([...chatMessages, newUserMessage]);
  //   setUserInput("");
  // };

  return (
    <>
      {/* <div className="flex justify-between h-screen p-4">
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
      </div> */}
    </>
  );
}
