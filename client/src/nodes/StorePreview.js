import React, { useEffect, useState } from "react";
import { fetchPreview } from "../Api";
function StorePreview({refresh}) {
  const [preview, setPreview] = useState(null);

  
  useEffect(() => {
    async function fetchData() {
    const preview=await fetchPreview();
    setPreview(preview);
    }
    fetchData();
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