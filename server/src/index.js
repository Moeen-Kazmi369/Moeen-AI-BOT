const express = require("express");
const app = express();
const cors=require("cors");
app.use(express.json());
app.use(cors());
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY="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";
const configuration = new Configuration({
  apiKey:OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.get("/ping", (req, res) => {
  res.json({
    message: "pong"
  });
});

app.post("/chat", (req, res) => {
  const question = req.body.question;
  openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 4000,
    temperature: 0,
  }).then((response)=>{
      return response.data?.choices?.[0]?.text;
  }).then((answer="")=>{
    const array=answer?.split("\n").filter((value)=>value).map((value)=>value.trim());
    return array;
  }).then((answer)=>{
    res.json({
        answer: answer,
        prompt: question
      });
      // console.log(answer);
  })
  // console.log({ question });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
