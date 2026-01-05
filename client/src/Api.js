import axios from "axios";

export const askAi = async (inputText) => { 
     try {
      const res = await axios.post(`${process.env.REACT_APP_API}/ask-ai`, {
        prompt: inputText,
      });

       return res.data.answer;
    } catch (err) {
      console.log(err);
      throw err;
    }
}


export const saveMessage = async (inputText,result,imageUrl) => {
   try{
     await fetch(`${process.env.REACT_APP_API}/save-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputText,
        response: result,
        imageUrl: imageUrl,
      }),
    });

   }
   catch(err){
    console.error("Save Message Error:", err.message);
    throw err;
   }
}

