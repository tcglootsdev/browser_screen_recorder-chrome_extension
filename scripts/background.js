chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create({
    url: "popup/popup.html",
    type: "popup",
    width: 400,
    height: 600,
  });
});
