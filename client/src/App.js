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

    const res = await axios.post("http://localhost:5000/api/ask-ai", {
      prompt: inputText,
    });

    setResult(res.data.answer);
  };

  const saveToDB = async () => {
  if (!inputText || !result) return;

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
    alert("Failed to save");
  } finally {
    setSaving(false);
  }
};


  return (
    <>
  
    <div style={{ height: "100vh" }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button
        onClick={runFlow}
        style={{
          position: "absolute",
          zIndex: 10,
          top: 10,
          left: 10,
          padding: "8px 16px",
        }}
      >
        ▶ Run Flow
      </button>
        <div style={{ marginTop: "10px" }}>
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
          <p style={{ color: "green", marginTop: "5px" }}>
            ✅ Saved to MongoDB
          </p>
        )}
      </div>
    </div>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  
  </>

  );
}
