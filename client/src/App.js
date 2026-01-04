import { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

import InputNode from "./nodes/InputNode";
import ResultNode from "./nodes/ResultNode";

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

  const nodes = [
    {
      id: "1",
      type: "inputNode",
      position: { x: 50, y: 100 },
      data: {
        text: inputText,
        onChange: setInputText,
      },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 350, y: 100 },
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

    try {
      const res = await axios.post("http://localhost:5000/api/ask-ai", {
        prompt: inputText,
      });

      setResult(res.data.answer);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error || err.message || "An error occurred while fetching the result.");
    }
  };

  const saveToDB = async () => {
  if (!inputText || !result) return;

  setError(""); // Clear previous errors

  try {
    setSaving(true);

    await fetch("http://localhost:5000/api/save-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputText,
        response: result,
      }),
    });

    setSaved(true);
  } catch (err) {
    setError(err.response.data.error || err.message || "An error occurred while saving the message.");
  } finally {
    setSaving(false);
  }
};


  return (
    <>
  
    <div style={{ height: "100vh" ,width: "100vw", position: 'relative' }}>
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
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  
  </>

  );
}
