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

  return (
    <div style={{ height: "100vh" }}>
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

      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
