import { Handle } from "reactflow";

export default function InputNode({ data }) {
  return (
    <div style={{ padding: 10, border: "1px solid #555", width: 200 }}>
      <strong>Text Input</strong>

      <textarea
        rows={3}
        style={{ width: "100%", marginTop: 5 }}
        value={data.text}
        onChange={(e) => data.onChange(e.target.value)}
        placeholder="What is the capital of France?"
      />

      <Handle type="source" position="right" />
    </div>
  );
}
