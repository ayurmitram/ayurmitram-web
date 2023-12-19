import { useDispatch, useSelector } from "react-redux";
import { setIsMinimized, setNewMessageFunction, setSelectedResponses } from "../store/layout";
import { useEffect, useState, useRef } from "react";
import { CircularProgress } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import MinimizeIcon from "@mui/icons-material/Minimize";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import MicIcon from "@mui/icons-material/Mic";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { auth_patient } from "../controllers/patientRoutes";

const MessageBox = ({ message, prev, next, handleSendMessage }) => {
  const selectedResponses = useSelector((state) => state.layout.selectedResponses);

  const dispatch = useDispatch();

  const optionHandler = ({ msg, display }) => {
    if (selectedResponses?.reduce((acc, curr) => acc || curr.text === display, false)) {
      dispatch(setSelectedResponses(selectedResponses.filter((response) => response.text !== display)))
    } else {  
      dispatch(setSelectedResponses([...selectedResponses, { text: display, val: msg }]))
    }
  }

  const handleFinal = () => {
    let map = { '1': 0, '2': 0, '3': 0 };
    selectedResponses.forEach((response) => {
      map[response.val] += 1;
    });
    let max = 0;
    let maxKey = '1';
    for (let key in map) {
      if (map[key] > max) {
        max = map[key];
        maxKey = key;
      }
    }
    console.log(maxKey, 'maxKey');
    handleSendMessage({ msg: maxKey, display: selectedResponses.map((r) => r?.text)?.join(', ') });
    dispatch(setSelectedResponses([]));
  }

  console.log(message, 'message');
  return (
    <>
      <div
        className={`
            px-3 py-2 rounded-2xl w-fit min-w-[10rem] max-w-[25rem]
            ${
              message?.type === "user"
                ? `
                  bg-[#539C52] self-end text-white pr-8 
                  ${prev && prev.type === "user" && "rounded-tr-md"}
                  ${next && next.type === "user" && "rounded-br-md"}
              `
                : `
                  bg-[#F5F5F5] pl-8
                  ${prev && prev.type === "bot" && "rounded-tl-md"}
                  ${next && next.type === "bot" && "rounded-bl-md"}
              `
            }
        `}
        style={{ whiteSpace: "pre-line" }}
      >
        {message?.type === "user" ? message?.display || message?.text : (JSON.parse(message?.text?.answer ?? `{}`)?.answer || JSON.parse(message?.text?.answer ?? `{}`)?.question)}
      </div>
      {JSON.parse(message?.text?.answer ?? `{}`)?.options && next === null && (
        <>
        <div className="flex flex-row flex-wrap items-start gap-2 mt-2 w-full px-5">
          {JSON.parse(message?.text?.answer)?.options?.[1] && (
            JSON.parse(message?.text?.answer)?.options?.[1].split(';').map((option, index) => (
              <div className="px-3 py-2 cursor-pointer rounded-lg text-sm whitespace-nowrap min-w-[5rem] overflow-hidden text-ellipsis text-black text-center" onClick={() => optionHandler({ msg: '1', display: option })} style={{
                backgroundColor: selectedResponses?.reduce((acc, curr) => acc || curr.text === option, false) ? '#DFBD50' : '#EFEEEE',
              }}>
                {option}
              </div>
            ))
          )}
          {JSON.parse(message?.text?.answer)?.options?.[2] && (
            JSON.parse(message?.text?.answer)?.options?.[2].split(';').map((option, index) => (
              <div className="px-3 py-2 cursor-pointer rounded-lg text-sm whitespace-nowrap min-w-[5rem] overflow-hidden text-ellipsis text-black text-center" onClick={() => optionHandler({ msg: '2', display: option })} style={{
                backgroundColor: selectedResponses?.reduce((acc, curr) => acc || curr.text === option, false) ? '#DFBD50' : '#EFEEEE',
              }}>
                {option}
              </div>
            ))
          )}
          {JSON.parse(message?.text?.answer)?.options?.[3] && (
            JSON.parse(message?.text?.answer)?.options?.[3].split(';').map((option, index) => (
              <div className="px-3 py-2 cursor-pointer rounded-lg text-sm whitespace-nowrap min-w-[5rem] overflow-hidden text-ellipsis text-black text-center" onClick={() => optionHandler({ msg: '3', display: option })} style={{
                backgroundColor: selectedResponses?.reduce((acc, curr) => acc || curr.text === option, false) ? '#DFBD50' : '#EFEEEE',
              }}>
                {option}
              </div>
            ))
          )}
        </div>
        <div className="px-3 py-2 text-white bg-[#539C52] rounded-lg min-w-[5rem] text-center mt-2 ms-5" onClick={handleFinal} style={{
          backgroundColor: selectedResponses?.length === 0 ? '#EFEEEE' : '#539C52',
          cursor: selectedResponses?.length === 0 ? 'not-allowed' : 'pointer',
          color: selectedResponses?.length === 0 ? '#000000' : '#FFFFFF',
        }}>
          Send
        </div>
        </>
      )}
    </>
  );
};

const Chatbot = () => {
  const dispatch = useDispatch();
  const isMinimized = useSelector((state) => state.layout.isMinimized);
  const activeBot = useSelector((state) => state.layout.activeBot);
  const chatResponseContainerRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [quizEnded, setQuizEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [responseList, setResponseList] = useState([]);
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    medical_history: ""
  });

  // const isEndOfQuiz = () => quizEnded

  const getPatientDetails = () => {
    if(localStorage.getItem("token")){
      let obj = {
        token: localStorage.getItem("token"),
      }
      console.log(obj.token, '***********')
      auth_patient(obj).then((res) => {
        if(res.tag){
          let {patient_name, patient_age, patient_gender, patient_medical_history} = res.patient;
          console.log("patient name: ", patient_name);
          console.log("patient age: ", patient_age);
          console.log("patient gender", patient_gender);
          console.log("patient_medical_history", patient_medical_history);

          let obj = {
            name: patient_name,
            age: patient_age,
            gender: patient_gender,
            medical_history: patient_medical_history
          };
          setPatientDetails(obj);
        }
      })
    }
  }

  const predictResponse = async (userMessage) => {
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      console.log("Response status:", response);

      const data = await response.json();
      console.log(data);
      return data; 
    } catch (error) {
      console.error("Error predicting response:", error);
      return "Sorry, an error occurred.";
    }
  };

  const [chatMessages, setChatMessages] = useState([
  ]);
  // example values
  // { type: user, text: '1', display: 'short hair' },
  // { type: bot, text: {
  //   answer: "{\"question\": \"Describe the general feel of skin\", \"options\": {\"1\": \"Dry and thin- cool to touch, rough\", \"2\": \"Smooth and warm, oily T-zone\", \"3\": \"Thick and moist-greasy, cold\"}}"
  // }
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  let startListening;
  if (browserSupportsContinuousListening) {
    startListening = () => {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    };
  } else {
    startListening = () => {
      resetTranscript();
      SpeechRecognition.startListening();
    };
  }

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  function isStringAnInteger(str) {
    return /^\d+$/.test(str);
  }

  

  const saveMessageToBackend = async(messageData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/message/create`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData)
      })
      if(response.ok){
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error('Error saving message:', err);
    }
  }

  const handleSendMessage = async ({ msg = userInput, display = undefined }) => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setUserInput('');
    setLoading(true);
    if (isStringAnInteger(msg)) {
      if(msg === '1' || msg === '2' || msg === '3'){
        const newUserMessage = { type: "user", text: msg, display, timestamp: new Date().toLocaleTimeString() };
        const botReply = await predictResponse(msg);
        setSelectedResponses((prevSelectedResponse) => [
          ...prevSelectedResponse,
          { type: "user", text: msg, display, timestamp: new Date().toLocaleTimeString() },
          { type: "bot", text: botReply?.answer, timestamp: new Date().toLocaleTimeString() }, // Replace with actual bot response
        ]);
        // if (JSON.parse(botReply?.answer ?? `{}`)?.answer?.includes("Your prakriti is")){
        //   console.log("yes praktiti saved !!!!!!!!!!!!!!!");
        //   const prakritiType = JSON.parse(botReply?.answer ?? `{}`)?.answer;
        //   console.log(prakritiType, '$$$$$$$$$$$$$$$$$')
        //   const profileUpdateResponse = await fetch("http://localhost:8000/api/patient/complete-profile", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       patientId: localStorage.getItem("token").patientId,
        //       prakriti_type: prakritiType,
        //     }),
        //   });

        //   const profileDataUpdate = await profileUpdateResponse.json();
        //   console.log(profileDataUpdate, '#########');
        // }

        // saveMessageToBackend({ type: "user", message: msg, display });
        // saveMessageToBackend({ type: "bot", message: botReply?.answer });

        
        setTimeout(() => {
          setLoading(false);
          setChatMessages([
            ...chatMessages, newUserMessage,
            { type: "bot", text: botReply },
          ]);
        }, 1000);
        console.log(selectedResponses, '$$$$$$$');
      }
    }

    else{
      const newUserMessage = { type: "user", text: msg, display };
      console.log(newUserMessage, "#####")
      setChatMessages([...chatMessages, newUserMessage]);
  
      const botReply = await predictResponse(msg);

      // saveMessageToBackend({ type: "user", message: msg, display });
      // saveMessageToBackend({ type: "bot", message: botReply?.answer });
      
  
      

   
  
      console.log(botReply?.answer, "#####");
      // if (JSON.parse(botReply?.answer ?? `{}`)?.answer && JSON.parse(botReply?.answer ?? `{}`)?.answer?.includes("Your Prakriti is")) {
      //   setResponseList([
      //     ...responseList,
      //     { type: "user", text: newUserMessage?.text, display: newUserMessage?.display },
      //     { type: "bot", text: botReply?.answer },
      //   ]);
  
      //   setChatMessages([]);
      // } else {
      //   setResponseList([
      //     ...responseList,
      //     { type: "user", text: newUserMessage.text, display: newUserMessage?.display },
      //     { type: "bot", text: botReply?.answer },
      //   ]);
      // }
  
      setUserInput("");
      setTimeout(() => {
        setLoading(false);
        setChatMessages([
          ...chatMessages, newUserMessage,
          { type: "bot", text: botReply },
        ]);
      }, 1000);
    };
    }

   

  

  const generatePDF = async () => {
    const doc = new jsPDF();

    const lineHeight = 5; 
    const margin = 10;
    const maxWidth = doc.internal.pageSize.width - 2 * margin;
    const pageCenter = doc.internal.pageSize.width / 2;
    let currentY = margin;
    doc.setFont("helvetica", "bold");

    // Add title
    doc.setFontSize(30); 
    doc.setTextColor(83, 156, 82); 
    const titleText = "AyurMitram Report";
    const titleWidth =
      (doc.getStringUnitWidth(titleText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const titleX = pageCenter - titleWidth / 2;
    doc.text(titleText, titleX, currentY);
    currentY += 2 * lineHeight;

  
    doc.setTextColor(0);

 
    const patientName = patientDetails.name;
    const patientAge = patientDetails.age;
    const patientGender = patientDetails.gender; 
    const patientMedicalHistory = patientDetails.medical_history;
    const todayDate = new Date().toLocaleDateString(); 

    doc.setFontSize(12);
    doc.text(`Patient Name: ${patientName}`, margin, currentY);
    currentY += lineHeight;

    doc.text(`Patient Age: ${patientAge}`, margin, currentY);
    currentY += lineHeight;

    doc.text(`Patient Gender: ${patientGender}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`Date: ${todayDate}`, margin, currentY);

    const lastEntry = patientMedicalHistory.length > 0 ? patientMedicalHistory[patientMedicalHistory.length - 1] : null;

    if(lastEntry) {
      // currentY += lineHeight;
      doc.text(`  Blood Pressure: High - ${lastEntry.blood_pressure.high} mmHg, Low - ${lastEntry.blood_pressure.low} mmHg`, 70, currentY-3*lineHeight);
      currentY += lineHeight;
      doc.text(`  Sugar Level: Before Food - ${lastEntry.sugar_level.before_food} mg/dL, After Food - ${lastEntry.sugar_level.after_food} mg/dL`, 70, currentY-3*lineHeight);
      currentY += lineHeight;
      doc.text(`  Pulse Rate: ${lastEntry.pulse_rate} bpm`, 70, currentY-3*lineHeight);
      currentY += lineHeight;
      doc.text(`  Temperature: ${lastEntry.temperature} °F`, 70, currentY-3*lineHeight);
      currentY += lineHeight;
      doc.text(`  Sleep Hours: ${lastEntry.sleep_hours} hours`, 70, currentY-3*lineHeight);
      currentY += lineHeight;
    }    
    
    // currentY += lineHeight;

   
    currentY += 1.5 * lineHeight;

    doc.setFontSize(25);
    doc.setTextColor(0, 0, 0); 
    const prakrutiAnalysisText = "Prakruti Analysis";
    doc.text(prakrutiAnalysisText, margin, currentY);
    currentY += 0.5 * lineHeight;

    doc.setFontSize(12);

    const tableHeaders = ["Serial No.", "TimeStamp", "Question", "User Response"];
    const colWidths = [40, 30, 60, 50];

    let startY = currentY + lineHeight;

    doc.autoTable({
      startY: startY,
      head: [tableHeaders],
      body: [],
      theme: "plain",
      headStyles: {
        fillColor: [83, 156, 82], 
        textColor: 255, 
        fontSize: 12
      },
      columnStyles: {
        0: { cellWidth: colWidths[0] },
        1: { cellWidth: colWidths[1] },
        2: { cellWidth: colWidths[2]},
        3: {cellWidth: colWidths[3]}
      },
    });

    let serialNo = 1;
    selectedResponses?.forEach((message) => {
      const { type, text, display,timestamp } = message;

      if (type === "user") {
        doc.autoTable({
          body: [[serialNo++, timestamp ,"", display || text]], // Add timestamp for bot],
          startY: startY + 2*lineHeight, 
          theme: "plain",
          columnStyles: {
            0: { cellWidth: colWidths[0] },
            1: { cellWidth: colWidths[1] },
            2: { cellWidth: colWidths[2]},
            3: { cellWidth: colWidths[3]},
            fontSize: 10
          },
          cellStyles: {
            1: { overflow: "linebreak", columnWidth: colWidths[1] },
          },
        });
      } else {
        doc.autoTable({
          body: [
            ["", "", JSON.parse(text ?? `{}`)?.answer || JSON.parse(text ?? `{}`)?.question, ""], // Add timestamp for bot
          ],
          startY: startY + lineHeight, 
          theme: "plain",
          columnStyles: {
            0: { cellWidth: colWidths[0] },
            1: { cellWidth: colWidths[1] },
            2: { cellWidth: colWidths[2] },
            3: { cellWidth: colWidths[3]},
          },
        });
      }
      


      startY += lineHeight;
    });
    doc.save("chat_history.pdf");
  };

  const toggleChatbot = () => {
    dispatch(setIsMinimized(!isMinimized));
  };

  useEffect(() => {
    const container = chatResponseContainerRef.current;

    const isNearBottom = () => {
      const threshold = 100;
      return container.scrollTop + container.clientHeight + threshold >= container.scrollHeight;
    };

    if(isNearBottom()){
      container.scrollTop = container.scrollHeight;
    }
    getPatientDetails();
    if (transcript) {
      setUserInput(transcript);
    }

    dispatch(setNewMessageFunction(handleSendMessage)) // to start a chat on button click
  }, [transcript, chatMessages]);

  return (
    <div className={`w-full lg:w-5/12 h-full min-h-screen lg:min-h-0 fixed lg:static z-50 top-0 left-0 bg-white p-5 rounded-none lg:rounded-2xl ${isMinimized ? 'hidden' : 'block'}`}>
      <div className=" flex flex-col h-full gap-5 relative ">
        <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center justify-between">
          AyurMitram Chatbot
          <Button variant="outlined" color="lightGray" onClick={toggleChatbot}>
            <MinimizeIcon color="black" />
          </Button>
        </div>
        <div className="w-full h-[0px] bg-black/50 "></div>
        <div
        ref={chatResponseContainerRef}
        style={{ scrollBehavior: 'smooth' }}
          className={`flex flex-col items-start gap-1 font-medium h-[calc(100%_-_2rem_-_0.5px_-_4rem_-_2.5rem)] overflow-y-auto`}
        >
          {chatMessages?.map((message, index) => (
            <MessageBox
              key={index}
              message={message}
              prev={index === 0 ? null : chatMessages[index - 1]}
              next={
                index === chatMessages?.length - 1
                  ? null
                  : chatMessages[index + 1]
              }
              handleSendMessage={handleSendMessage}
            />
          ))}

          {loading && (
            <>
            <div className="my-2 flex justify-center w-full">
              <CircularProgress color="secondary" />
            </div>
            </>
          )}
          <div className=" my-2 flex justify-center w-full">
            <Button
              disableElevation
              variant="contained"
              color="white"
              onClick={() => setChatMessages([])}
            >
              <RefreshRoundedIcon color="secondary" className="me-2" />
              Restart
            </Button>
            <Button
              disableElevation
              variant="contained"
              color="white"
              onClick={generatePDF}
            >
              Generate PDF
            </Button>
          </div>
        </div>

        <div className="w-full mt-auto absolute bottom-0 z-10 bg-white">
          <TextField
            disabled={activeBot === 'quiz'}
            variant="outlined"
            fullWidth
            type="text"
            value={userInput}
            onChange={handleUserInput}
            color="black"
            placeholder="Type your message here"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage({});
              }
            }}
            InputProps={{
              sx: {
                borderRadius: "1.25rem",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip
                    title={
                      !browserSupportsSpeechRecognition
                        ? "Browser does not support speech recognition"
                        : !isMicrophoneAvailable
                        ? "Microphone access denied"
                        : listening
                        ? "Stop listening"
                        : "Start listening"
                    }
                    placement="bottom"
                  >
                    <div>
                      <IconButton
                        sx={{ marginLeft: "-0.5rem" }}
                        color="secondary"
                        disabled={
                          !browserSupportsSpeechRecognition ||
                          (browserSupportsSpeechRecognition &&
                            !isMicrophoneAvailable)
                        }
                        onClick={
                          listening
                            ? SpeechRecognition.stopListening
                            : startListening
                        }
                      >
                        {listening ? <StopRoundedIcon /> : <MicIcon />}
                      </IconButton>
                    </div>
                  </Tooltip>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    disabled={!userInput}
                    disableElevation
                    sx={{
                      padding: "0.5rem",
                      minWidth: "0px",
                      borderRadius: "999px",
                    }}
                    color="secondary"
                    onClick={handleSendMessage}
                  >
                    <SendRoundedIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
