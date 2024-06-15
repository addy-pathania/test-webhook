const github = JSON.parse(process.env.GITHUB);

/**
 * @param payload
 */
function transformPayload(payload) {
  console.log("payload", payload);
  // const title = `JSS Release ${payload.release.body.tag_name}`;
  // const releaseUrl = payload.release.body.html_url;
  // const publishedBy = payload.sender.login;

  // const teamsPayload = {
  //   "@type": "MessageCard",
  //   "@context": "http://schema.org/extensions",
  //   themeColor: "0076D7",
  //   title: title,
  //   text: `**Release:** ${releaseUrl}\n\n**Published by:** ${publishedBy}}`,
  // };
  // return teamsPayload;
}

(async () => {
  if (!process.env.TEAMS_WEBHOOK_URL) {
    // TODO: add better log message
    console.log("Skipped 1");
    return;
  }

  transformPayload(github.event);

  // try {
  //   await fetch(process.env.TEAMS_WEBHOOK_URL, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       ...transformPayload(github.event),
  //     }),
  //   });
  // } catch (error) {
  //   // TODO: add better log message
  //   console.log("Error occurred ", error);
  //   process.exit(1);
  // }
})();
