const express = require("express");
const axios = require("axios");

const TEAMS_WEBHOOK_URL = "WEBHOOK_URL";

const app = express();
app.use(express.json());

function transformPayload(payload) {
  const title = `GitHub Alert: ${payload.alert?.tool?.name || ""}`;
  const repository = payload.repository?.full_name || "";
  const sender = payload.sender?.login || "";
  const url = payload.alert?.html_url || "";

  const teamsPayload = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    themeColor: "0076D7",
    title: title,
    text: `**Repository:** ${repository}\n\n**Triggered by:** ${sender}\n\n**Alert URL:** ${url}`,
  };
  return teamsPayload;
}

async function sendToTeams(teamsPayload) {
  try {
    const response = await axios.post(TEAMS_WEBHOOK_URL, teamsPayload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.status;
  } catch (error) {
    console.error("Error sending to Teams:", error);
    return error.response ? error.response.status : 500;
  }
}

app.post("/webhook", async (req, res) => {
  const payload = req.body;
  const teamsPayload = transformPayload(payload);
  const statusCode = await sendToTeams(teamsPayload);
  res.json({ status: "success", statusCode });
});

const PORT = 9001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
