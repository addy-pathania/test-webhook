const github = JSON.parse(process.env.GITHUB);

/**
 * @param payload
 */
function transformPayload(payload) {
  console.log("payload", payload);
}

(async () => {
  if (!process.env.TEAMS_WEBHOOK_URL) {
    // TODO: add better log message
    console.log("Skipped 1");
    return;
  }

  transformPayload(github.event);
})();
