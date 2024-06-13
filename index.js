const express = require("express");
const axios = require("axios");

const TEAMS_WEBHOOK_URL =
  "https://sitecore1.webhook.office.com/webhookb2/5e8958b3-de1b-4239-a80c-80b33d2b840a@91700184-c314-4dc9-bb7e-a411df456a1e/IncomingWebhook/14c5be112bc7402d83d828efe799c0a0/db9aee50-0354-4b8e-9b36-37c0bbbddc14";

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
