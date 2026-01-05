import { Handle } from "reactflow";

export default function ResultNode({ data }) {
  return (
    <div style={{ padding: 10, border: "1px solid #008000", width: 220 }}>
      <strong>Result</strong>

      <div
        style={{
          marginTop: 5,
          minHeight: 60,
          background: "#f4f4f4",
          padding: 5,
        }}
        dangerouslySetInnerHTML={{
    __html: data.result || "Waiting for output...",
  }}
     / >
        {/* {data.result || "Waiting for output..."} */}
      {/* </div> */}

      <Handle type="target" position="left" />
    </div>
  );
}
