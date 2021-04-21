var port = chrome.runtime.connect();
port.postMessage({ sendMeData: "send" });

port.onMessage.addListener(function (msg) {
  console.log(msg.dataToSend);
  const { div, pre, button } = createPopup();
  pre.innerText = "Please, check the data before send! \n";

  pre.innerText = pre.innerText + JSON.stringify(msg.dataToSend, null, 2);
});
