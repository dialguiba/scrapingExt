const sendToDatabase = async (data, button) => {
  button.innerText = "Cargando...";
  button.style =
    "background-color: #98710d;border: 2px solid #3582e0;border-radius: 4px;color:#ffffff; padding: 8px;position: absolute;bottom: 10px;right: 10px;";
  const rawResponse = await fetch("https://bootcamp-scrap-ext.herokuapp.com/api/v1/profile/storage", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(data),
  });
  button.innerText = "Completado";
  button.style =
    "background-color: #3582e0;border: 2px solid #3582e0;border-radius: 4px;color:#ffffff; padding: 8px;position: absolute;bottom: 10px;right: 10px;";
  button.removeEventListener("click", sendToDatabase);
  button.disabled = true;
};

chrome.runtime.sendMessage({ sendMeData: "send" }, function (response) {
  const { div, pre, button } = createFinalPopup();
  pre.innerText = "Please, check the data before send! \n";
  pre.innerText = pre.innerText + JSON.stringify(response.dataToSend, null, 2);

  const buttonSend = document.createElement("button");
  button.id = "krowdy-profile-button";
  button.style =
    "background-color: #3582e0;border: 2px solid #3582e0;border-radius: 4px;color:#ffffff; padding: 8px;position: absolute;bottom: 10px;right: 10px;";
  button.innerText = "Enviar";

  button.addEventListener(
    "click",
    function () {
      sendToDatabase(response.dataToSend, button);
    },
    false
  );

  pre.appendChild(button);
});
