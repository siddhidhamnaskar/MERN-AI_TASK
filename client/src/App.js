import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import { getMessages } from "./Api";
import "reactflow/dist/style.css";


import InputNode from "./nodes/InputNode";
import ResultNode from "./nodes/ResultNode";

import { askAi, saveMessage } from "./Api";
import { OnlineStore } from "./Store";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

export default function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;


 const nodes = [
  {
    id: "1",
    type: "inputNode",
    position: { x: centerX - 300, y: centerY - 50 },
    data: {
      text: inputText,
      onChange: setInputText,
    },
  },
  {
    id: "2",
    type: "resultNode",
    position: { x: centerX + 50, y: centerY - 50 },
    data: {
      result,
    },
  },
];


  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
    },
  ];


 

  const runFlow = async () => {
    if (!inputText) return alert("Enter text first");

    setError(""); // Clear previous errors
    try{
    const result=await askAi(inputText);
  
    setResult(result);
  
  
    }
    catch(err){
      console.log(err);
      setError(err.response.data.error || err.message || "An error occurred while fetching AI response.");
    }

  };

  const saveToDB = async () => {
  if (!inputText || !result) return;

  setError(""); // Clear previous errors

  try {
    setSaving(true);
    await saveMessage(inputText, result);

    setSaved(true);
  } catch (err) {
    setError(err.response.data.error || err.message || "An error occurred while saving the message.");
  } finally {
    setSaving(false);
  }
};


useEffect(() => {
  const fetchMessages = async () => {
      const messages = await getMessages(); 
      setMessages(messages);
      setPrompt(messages[0].prompt);
      setResponse(messages[0].response);
      console.log("Messages from DB:", messages);
    }; 
  if (inputText === "" || result === "") {
    setSaved(false);
  }
  if(saved){
   
   
    const timer = setTimeout(() => {
      setSaved(false);
    }, 3000);

    return () => clearTimeout(timer);
  }
   fetchMessages();
}, [saved, inputText, result]);


  return (
    <>
   <div style={{width:"100vw",display:'flex', flexDirection:'row'}}>
    <div style={{ height: "100vh" ,width: "70vw", position: 'relative' }}>
       {error && (
          <p style={{ color: "red", margin: 0,justifyContent:'center', alignItems:'center', display:'flex', position: 'absolute', top: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            ❌ {error}
          </p>
        )}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={runFlow}
          style={{
            padding: "8px 16px",
             backgroundColor: inputText ? "#4CAF50" : "#ccc",
             color: inputText ? "white" : "black",
          }}
        >
          ▶ Run Flow
        </button>
        <button
          onClick={saveToDB}
          disabled={!result || saving}
          style={{
            padding: "8px 16px",
            backgroundColor: result ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            cursor: result ? "pointer" : "not-allowed",
          }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {saved && (
          <p style={{ color: "green", margin: 0 }}>
            ✅ Saved to MongoDB
          </p>
        )}
       
      </div>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
    <div style={{width:"30vw"}}>
      <OnlineStore prompt={prompt}  response={response} />
    </div>
   </div>
  </>

  );
}
