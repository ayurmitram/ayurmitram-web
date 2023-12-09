import { useDispatch, useSelector } from "react-redux";
import { setIsMinimized } from "../store/layout";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MinimizeIcon from '@mui/icons-material/Minimize';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import MicIcon from '@mui/icons-material/Mic';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendRoundedIcon from '@mui/icons-material/SendRounded';


const MessageBox = ({ message, prev, next, clickHandler }) => {
    return (
        <>
            <div className={`
                px-3 py-2 rounded-2xl w-fit min-w-[10rem] max-w-[25rem]
                ${message?.type === 'user' 
                    ? `
                        bg-[#539C52] self-end text-white pr-8 
                        ${prev && prev.type === 'user' && 'rounded-tr-md'}
                        ${next && next.type === 'user' && 'rounded-br-md'}
                    ` 
                    : `
                        bg-[#F5F5F5] pl-8
                        ${prev && prev.type === 'bot' && 'rounded-tl-md'}
                        ${next && next.type === 'bot' && 'rounded-bl-md'}
                    `
                }

            `}>
                {message?.text}
            </div>
            {(message?.options && next === null) && (
                <div className="flex items-center gap-2 w-full overfloe-scroll px-5 h-auto">
                    {message?.options?.map((option, index) => (
                        <div key={index} className="px-3 py-2 cursor-pointer rounded-lg text-sm whitespace-nowrap min-w-[5rem] max-w-[15rem] bg-[#EFEEEE] overflow-hidden text-ellipsis text-slate-600 text-center " onClick={() => clickHandler(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

const Chatbot = () => {
    const dispatch = useDispatch()
    const isMinimized = useSelector(state => state.layout.isMinimized)
    const [userInput, setUserInput] = useState("");

    const [chatMessages, setChatMessages] = useState([
        { type: "user", text: "Hello, Ayurmitram!" },
        { type: "bot", text: "Hi there! How can I assist you today?" },
        { type: 'user', text: 'I am not feeling well' },
        { type: 'user', text: 'Start a prakruti analysis' },
        { type: 'bot', text: 'Sure, select a mode from below', options: ['Quick', 'Comprehensive'] },
    ]);

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = ({ msg = userInput }) => {
        const newUserMessage = { type: "user", text: msg };
        setChatMessages([...chatMessages, newUserMessage]);
        setUserInput("");
    };

    const toggleChatbot = () => {
        dispatch(setIsMinimized(!isMinimized))
    }

    return (
        <div className="w-full h-full flex flex-col gap-5 relative">
            <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center justify-between">
                Ayurmitram
                <Button variant="outlined" color="lightGray" onClick={toggleChatbot} >
                    <MinimizeIcon color="black" />
                </Button>
            </div>
            <div className='w-full h-[0px] bg-black/50 '></div>
            <div className={`flex flex-col items-start gap-1 font-medium h-[calc(100%_-_2rem_-_0.5px_-_4rem_-_2.5rem)] overflow-y-auto`}>
                {chatMessages?.map((message, index) => (
                    <MessageBox key={index} message={message} prev={index === 0 ? null : chatMessages[index-1]} next={index === chatMessages?.length -1 ? null : chatMessages[index+1]} clickHandler={handleSendMessage} />
                ))}
                <div className=" my-2 flex justify-center w-full">
                    <Button disableElevation variant="contained" color="white" onClick={() => setChatMessages([])}>
                        <RefreshRoundedIcon color="secondary" className="me-2" />
                        Restart
                    </Button>
                </div>
            </div>

            <div className="w-full mt-auto absolute bottom-0 z-10 bg-white">
                <TextField 
                    variant="outlined"
                    fullWidth
                    type="text"
                    value={userInput}
                    onChange={handleUserInput}
                    color="black"
                    placeholder="Type your message here"
                    InputProps={{
                        sx: {
                            borderRadius: '1.25rem'
                        },
                        startAdornment: <InputAdornment position="start">
                            <IconButton sx={{ marginLeft: '-0.5rem' }} color="secondary">
                                <MicIcon />
                            </IconButton>
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <Button variant="contained" disabled={!userInput} disableElevation sx={{ padding: '0.5rem', minWidth: '0px', borderRadius: '999px' }} color="secondary" onClick={handleSendMessage}>
                                <SendRoundedIcon />
                            </Button>
                        </InputAdornment>
                    }}
                />
            </div>
        </div>
    )
}

export default Chatbot