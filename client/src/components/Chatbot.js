import { useDispatch, useSelector } from "react-redux";
import { setIsMinimized } from "../store/layout";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import MinimizeIcon from '@mui/icons-material/Minimize';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import MicIcon from '@mui/icons-material/Mic';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const MessageBox = ({ message, prev, next, clickHandler }) => {
    return (
      <>
        <div
          className={`
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
        `}
        style={{ whiteSpace: 'pre-line' }}
        >
          {message?.type === 'user' ? message.text : message.text.answer}
        </div>
        {(message?.options && next === null) && (
          <div className="flex items-center gap-2 w-full overflow-scroll px-5 h-auto">
            {message?.options?.map((option, index) => (
              <div
                key={index}
                className="px-3 py-2 cursor-pointer rounded-lg text-sm whitespace-nowrap min-w-[5rem] max-w-[15rem] bg-[#EFEEEE] overflow-hidden text-ellipsis text-slate-600 text-center "
                onClick={() => clickHandler(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };
  

const Chatbot = () => {
    const dispatch = useDispatch()
    const isMinimized = useSelector(state => state.layout.isMinimized)
    const [userInput, setUserInput] = useState("");

    const predictResponse = async (userMessage) => {
        try {
          const response = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: userMessage}),
          });

          console.log('Response status:', response);

          const data = await response.json();
          console.log(data);
          return data; // Assuming the response contains a 'reply' field
        } catch (error) {
          console.error('Error predicting response:', error);
          return 'Sorry, an error occurred.';
        }
      };

    const [chatMessages, setChatMessages] = useState([
        // { type: "user", text: "Hello, Ayurmitram!" },
        // { type: "bot", text: "Hi there! How can I assist you today?" },
        // { type: 'user', text: 'I am not feeling well' },
        // { type: 'user', text: 'Start a prakruti analysis' },
        // { type: 'bot', text: 'Sure, select a mode from below', options: ['Quick', 'Comprehensive'] },
    ]);
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable, browserSupportsContinuousListening } = useSpeechRecognition();
    
    let startListening
    if (browserSupportsContinuousListening) {
        startListening = () => SpeechRecognition.startListening({ continuous: true });
    } else {
        startListening = () => SpeechRecognition.startListening();
    }

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = async ({ msg = userInput }) => {
        const newUserMessage = { type: "user", text: msg };
        setChatMessages([...chatMessages, newUserMessage]);

        const botReply = await predictResponse(msg);

        setChatMessages((prevMessages) => [
            ...prevMessages, { type: "bot", text: botReply}
        ]);

        setUserInput("");
    };

    const toggleChatbot = () => {
        dispatch(setIsMinimized(!isMinimized))
    }

    useEffect(() => {
        if (transcript) {
            setUserInput(transcript)
        }
    }, [transcript])

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
                            <Tooltip title={!browserSupportsSpeechRecognition ? 'Browser does not support speech recognition' : !isMicrophoneAvailable ? 'Microphone access denied' : listening ? 'Stop listening' : 'Start listening'} placement="bottom">
                                <div>
                                    <IconButton 
                                        sx={{ marginLeft: '-0.5rem' }} 
                                        color="secondary" 
                                        disabled={!browserSupportsSpeechRecognition || (browserSupportsSpeechRecognition && !isMicrophoneAvailable)} 
                                        onClick={listening ? SpeechRecognition.stopListening : startListening}
                                    >
                                        {listening ? <StopRoundedIcon /> : <MicIcon />}
                                    </IconButton>
                                </div>
                            </Tooltip>
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