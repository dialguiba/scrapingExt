chrome.runtime.sendMessage({ sendMeData: "send" }, function (response) {
  const { div, pre, button } = createPopup();
  pre.innerText = "Please, check the data before send! \n";

  pre.innerText = pre.innerText + JSON.stringify(response.dataToSend, null, 2);
});
