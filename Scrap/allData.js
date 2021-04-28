const sendToDatabase = async (data, button) => {
  button.innerText = "Cargando...";
  button.style.backgroundColor = "#98710d";
  button.style.cursor = "progress";
  const rawResponse = await fetch("https://bootcamp-scrap-ext.herokuapp.com/api/v1/profile/storage", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(data),
  });
  button.innerText = "Completado";
  button.style.backgroundColor = "#6A716A";
  button.style.cursor = "not-allowed";
  button.removeEventListener("click", sendToDatabase);
  button.disabled = true;
};

chrome.runtime.sendMessage({ sendMeData: "send" }, function (response) {
  const { div, pre, button } = createFinalPopup();
  pre.innerText = "Please, check the data before send! \n\n";
  pre.innerText = pre.innerText + JSON.stringify(response.dataToSend, null, 2);

  button.addEventListener(
    "click",
    function () {
      sendToDatabase(response.dataToSend, button);
    },
    false
  );

  chrome.runtime.sendMessage({ finished: "finish" });
});
