let btnstrap = document.getElementById("btnstrap");

btnstrap.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["./Scrap/background.js"],
    });
  } else {
    const pAlert = document.getElementById("alert");
    pAlert.innerText = "No se tiene permiso para los tabs.";
  }
});
