import { useDispatch, useSelector } from "react-redux";
import { setIsMinimized } from "../store/layout";
import { useEffect, useState } from "react";
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
  const [userInput, setUserInput] = useState("");
  const [responseList, setResponseList] = useState([]);

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
      return data; // Assuming the response contains a 'reply' field
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

  const handleSendMessage = async ({ msg = userInput, display = undefined }) => {
    const newUserMessage = { type: "user", text: msg, display };
    setChatMessages([...chatMessages, newUserMessage]);

    const botReply = await predictResponse(msg);

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", text: botReply },
    ]);

    console.log(botReply?.answer, "#####");
    if (JSON.parse(botReply?.answer ?? `{}`)?.answer && JSON.parse(botReply?.answer ?? `{}`)?.answer?.includes("Your Prakriti is")) {
      setResponseList([
        ...responseList,
        { type: "user", text: newUserMessage?.text, display: newUserMessage?.display },
        { type: "bot", text: botReply?.answer },
      ]);

      setChatMessages([]);
    } else {
      setResponseList([
        ...responseList,
        { type: "user", text: newUserMessage.text, display: newUserMessage?.display },
        { type: "bot", text: botReply?.answer },
      ]);
    }

    setUserInput("");
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const lineHeight = 5; // Adjust this value based on your font size and line spacing
    const margin = 10;
    const maxWidth = doc.internal.pageSize.width - 2 * margin;
    const pageCenter = doc.internal.pageSize.width / 2;
    let currentY = margin;
    doc.setFont("Poppins", "bold");

    // Add title
    doc.setFontSize(30); // Set a larger font size for the title
    // doc.setFont('bold'); // Make the title bold
    doc.setTextColor(83, 156, 82); // Set the color to #539C52
    const titleText = "Ayurmitram Report";
    const titleWidth =
      (doc.getStringUnitWidth(titleText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const titleX = pageCenter - titleWidth / 2;
    doc.text(titleText, titleX, currentY);
    currentY += 2 * lineHeight;

    // Reset font style and color for the rest of the content
    // doc.setFont('normal');
    doc.setTextColor(0); // Reset to default black

    // Add patient details
    const patientName = "John Doe"; // Replace with actual patient name
    const patientAge = 30; // Replace with actual patient age
    const todayDate = new Date().toLocaleDateString(); // Get current date

    doc.setFontSize(12);
    doc.text(`Patient Name: ${patientName}`, margin, currentY);
    currentY += lineHeight;

    doc.text(`Patient Age: ${patientAge}`, margin, currentY);
    currentY += lineHeight;

    doc.text(`Date: ${todayDate}`, margin, currentY);
    currentY += 5 * lineHeight;

    doc.setFontSize(25);
    doc.setTextColor(0, 0, 0); // Set text color to black
    const prakrutiAnalysisText = "Prakruti Analysis";
    doc.text(prakrutiAnalysisText, margin, currentY);
    currentY += 2 * lineHeight;

    doc.setFontSize(12);

    // Add chat history
    const tableHeaders = ["Serial No.", "Question", "User Response"];
    const colWidths = [30, 120, 30];

    // Set initial startY value
    let startY = currentY + lineHeight;

    doc.autoTable({
      startY: startY,
      head: [tableHeaders],
      body: [],
      theme: "plain",
      headStyles: {
        fillColor: [83, 156, 82], // Header background color
        textColor: 255, // Header text color
        fontSize: 12
      },
      columnStyles: {
        0: { cellWidth: colWidths[0] },
        1: { cellWidth: colWidths[1] },
        2: { cellWidth: colWidths[2]},
      },
    });

    // Populate the table with data
    let serialNo = 1;
    responseList?.slice(4).forEach((message) => {
      const { type, text, display } = message;

      if (type === "user") {
        doc.autoTable({
          body: [[serialNo++, "", display || text]],
          startY: startY + 2*lineHeight, // Add some space here, adjust as needed
          theme: "plain",
          columnStyles: {
            0: { cellWidth: colWidths[0] },
            1: { cellWidth: colWidths[1] },
            2: { cellWidth: colWidths[2]},
            fontSize: 10
          },
        });
      } else {
        doc.autoTable({
          body: [["", JSON.parse(text ?? `{}`)?.answer || JSON.parse(text ?? `{}`)?.question, ""]],
          startY: startY + lineHeight, // Add some space here, adjust as needed
          theme: "plain",
          columnStyles: {
            0: { cellWidth: colWidths[0] },
            1: { cellWidth: colWidths[1] },
            2: { cellWidth: colWidths[2] },
          },
        });
      }

      // Update startY for the next iteration
      startY += 2*lineHeight;
    });
    doc.save("chat_history.pdf");
  };

  const toggleChatbot = () => {
    dispatch(setIsMinimized(!isMinimized));
  };

  useEffect(() => {
    if (transcript) {
      setUserInput(transcript);
    }
  }, [transcript]);

  return (
    <div className="w-full h-full p-5">
      <div className=" flex flex-col h-full gap-5 relative ">
        <div className="text-2xl min-h-[2rem] max-h-[2rem] flex items-center justify-between">
          Ayurmitram
          <Button variant="outlined" color="lightGray" onClick={toggleChatbot}>
            <MinimizeIcon color="black" />
          </Button>
        </div>
        <div className="w-full h-[0px] bg-black/50 "></div>
        <div
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
            disabled={activeBot === 'quiz'}
            variant="outlined"
            fullWidth
            type="text"
            value={userInput}
            onChange={handleUserInput}
            color="black"
            // onKeyDown={handleKeyDown}
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
