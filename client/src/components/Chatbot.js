import { useDispatch, useSelector } from "react-redux";
import { setIsMinimized, setNewMessageFunction } from "../store/layout";
import { useEffect, useState, useRef } from "react";
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

const MessageBox = ({ message, prev, next, optionHandler }) => {
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
        <div className="flex flex-col items-start gap-2 mt-2 w-full px-5">
          {JSON.parse(message?.text?.answer)?.options?.[1] && (
            <div className="px-3 py-2 cursor-pointer rounded-lg text-sm whitespace-nowrap min-w-[5rem] bg-[#EFEEEE] overflow-hidden text-ellipsis text-slate-600 text-center" onClick={() => optionHandler({ msg: '1', display: JSON.parse(message?.text?.answer)?.options?.[1] })}>
              {JSON.parse(message?.text?.answer)?.options?.[1]}
            </div>
          )}
          {JSON.parse(message?.text?.answer)?.options?.[2] && (
            <div className="px-3 py-2 cursor-pointer rounded-lg text-sm whitespace-nowrap min-w-[5rem] bg-[#EFEEEE] overflow-hidden text-ellipsis text-slate-600 text-center" onClick={() => optionHandler({ msg: '2', display: JSON.parse(message?.text?.answer)?.options?.[2] })}>
              {JSON.parse(message?.text?.answer)?.options?.[2]}
            </div>
          )}
          {JSON.parse(message?.text?.answer)?.options?.[3] && (
            <div className="px-3 py-2 cursor-pointer rounded-lg text-sm whitespace-nowrap min-w-[5rem] bg-[#EFEEEE] overflow-hidden text-ellipsis text-slate-600 text-center" onClick={() => optionHandler({ msg: '3', display: JSON.parse(message?.text?.answer)?.options?.[3] })}>
              {JSON.parse(message?.text?.answer)?.options?.[3]}
            </div>
          )}
        </div>
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

  const handleSendMessage = async ({ msg = userInput, display = undefined }) => {
    if (isStringAnInteger(msg)) {
      if(msg === '1' || msg === '2' || msg === '3'){
        const newUserMessage = { type: "user", text: msg, display };
        const botReply = await predictResponse(msg);
        setSelectedResponses((prevSelectedResponse) => [
          ...prevSelectedResponse,
          { type: "user", text: msg, display },
          { type: "bot", text: botReply?.answer }, // Replace with actual bot response
        ]);

        setChatMessages([
          ...chatMessages, newUserMessage,
          { type: "bot", text: botReply },
        ]);
        console.log(selectedResponses, '$$$$$$$');
      }
    } else {
      const newUserMessage = { type: "user", text: msg, display };
      console.log(newUserMessage, "#####")
      setChatMessages([...chatMessages, newUserMessage]);
  
      const botReply = await predictResponse(msg);
      
  
      setChatMessages([
        ...chatMessages, newUserMessage,
        { type: "bot", text: botReply },
      ]);

      if(botReply?.answer?.end)
  
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
    };
    }

   

  

  const generatePDF = async () => {
    const doc = new jsPDF();

    const lineHeight = 5; 
    const margin = 10;
    const maxWidth = doc.internal.pageSize.width - 2 * margin;
    const pageCenter = doc.internal.pageSize.width / 2;
    let currentY = margin;
    doc.setFont("Poppins", "bold");

    // Add title
    doc.setFontSize(30); 
    doc.setTextColor(83, 156, 82); 
    const titleText = "Ayurmitram Report";
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

    doc.text(`Patient Name: ${patientGender}`, margin, currentY);
    currentY += lineHeight;

    doc.text(`Patient Medical History: ${patientMedicalHistory}`, margin, currentY);
    currentY += lineHeight;

    doc.text(`Date: ${todayDate}`, margin, currentY);
    currentY += 3 * lineHeight;

    doc.setFontSize(25);
    doc.setTextColor(0, 0, 0); 
    const prakrutiAnalysisText = "Prakruti Analysis";
    doc.text(prakrutiAnalysisText, margin, currentY);
    currentY += 2 * lineHeight;

    doc.setFontSize(12);

    const tableHeaders = ["Serial No.", "Question", "User Response"];
    const colWidths = [30, 90, 50];

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
      },
    });

    let serialNo = 1;
    selectedResponses?.forEach((message) => {
      const { type, text, display } = message;

      if (type === "user") {
        doc.autoTable({
          body: [[serialNo++, "", display || text]],
          startY: startY + 2*lineHeight, 
          theme: "plain",
          columnStyles: {
            0: { cellWidth: colWidths[0] },
            1: { cellWidth: colWidths[1] },
            2: { cellWidth: colWidths[2]},
            fontSize: 10
          },
          cellStyles: {
            1: { overflow: "linebreak", columnWidth: colWidths[1] },
          },
        });
      } else {
        doc.autoTable({
          body: [["", JSON.parse(text ?? `{}`)?.answer || JSON.parse(text ?? `{}`)?.question, ""]],
          startY: startY + lineHeight, 
          theme: "plain",
          columnStyles: {
            0: { cellWidth: colWidths[0] },
            1: { cellWidth: colWidths[1] },
            2: { cellWidth: colWidths[2] },
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
    <div className="w-full h-full min-h-screen lg:min-h-0 fixed lg:static z-50 top-0 left-0 bg-white p-5">
      <div className=" flex flex-col h-full gap-5 relative ">
        <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center justify-between">
          Ayurmitram
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
              optionHandler={handleSendMessage}
            />
          ))}
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
            disabled={chatMessages[chatMessages.length - 1]?.type === "bot" && JSON.parse(chatMessages[chatMessages.length - 1]?.text?.answer ?? `{}`)?.options}
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
