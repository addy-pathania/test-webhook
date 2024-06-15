const github = JSON.parse(process.env.GITHUB);

/**
 * @param payload
 */
function transformPayload(payload) {
  console.log("payload", payload);

  const title = `JSS Release ${payload.tag_name}`;
  const releaseUrl = payload.html_url;
  const publishedBy = payload.author.login;

  const teamsPayload = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    themeColor: "0076D7",
    title: title,
    text: `**Release:** ${releaseUrl}\n\n**Published by:** ${publishedBy}`,
  };
  return teamsPayload;
}

(async () => {
  if (!process.env.TEAMS_WEBHOOK_URL) {
    // TODO: add better log message
    console.log("Skipped 1");
    return;
  }

  try {
    await fetch(process.env.TEAMS_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify({
        ...transformPayload(github.event.release),
      }),
    });
  } catch (error) {
    // TODO: add better log message
    console.log("Error occurred ", error);
    process.exit(1);
  }
})();
