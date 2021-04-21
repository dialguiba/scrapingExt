let inputStrap = document.getElementById("inputstrap");
let message = document.getElementById("message");
let formstrap = document.getElementById("formstrap");

formstrap.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.innerText = "Please, dont close this window until scrapping has finished";

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  let port = chrome.runtime.connect();
  port.postMessage({ input: inputStrap.value });

  port.onMessage.addListener(async function (msg) {
    if (msg.init) {
      if (activeTab) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ["./Scrap/init.js"],
        });
      } else {
        const pAlert = document.getElementById("alert");
        pAlert.innerText = "No se tiene permiso para los tabs.";
      }
    }
  });
});
