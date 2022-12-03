async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",

    /* valid reasons: 
    AUDIO_PLAYBACK, 
    BLOBS, 
    CLIPBOARD, 
    DISPLAY_MEDIA, 
    DOM_PARSER, 
    DOM_SCRAPING, 
    IFRAME_SCRIPTING,
    TESTING, 
    USER_MEDIA, 
    WEB_RTC.
    */
    reasons: ["AUDIO_PLAYBACK"],
    justification: "testing",
  });
}

chrome.runtime.onMessage.addListener(async (msg) => {
  switch (msg.type) {
    case "play":
      await createOffscreen();
      await chrome.runtime.sendMessage({
        type: "play",
        play: msg.play,
        offscreen: true,
      });
      break;
    case "pause":
      await createOffscreen();
      await chrome.runtime.sendMessage({ type: "pause", offscreen: true });
      break;
  }
});
