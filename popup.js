document.querySelector(".play").addEventListener("click", () => {
  chrome.runtime.sendMessage({
    type: "play",
    play: { source: "sound.mp3", volume: 1 },
  });
});

document.querySelector(".pause").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "pause" });
});
