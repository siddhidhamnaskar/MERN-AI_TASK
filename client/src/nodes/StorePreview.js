import React, { useEffect, useState } from "react";

function StorePreview() {
  const [preview, setPreview] = useState(null);

  const fetchPreview = async () => {
    const res = await fetch("http://localhost:5000/latest");
    const data = await res.json();
    setPreview(data);
  };

  useEffect(() => {
    fetchPreview();
  }, []);

  return (
    <div className="preview">
      <h3>Online Store Preview</h3>

      {preview && (
        <>
          <p>{preview.response}</p>

          {preview.imageUrl && (
            <img src={preview.imageUrl} width="200" alt="preview" />
          )}
        </>
      )}
    </div>
  );
}
export default StorePreview;