const sendToDatabase = async (data, button, inputEndpoint) => {
  button.innerText = "Cargando...";
  button.style.backgroundColor = "#98710d";
  button.style.cursor = "progress";
  // "https://bootcamp-scrap-ext.herokuapp.com/api/v1/profile/storage"
  const rawResponse = await fetch(inputEndpoint.value , {
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

const generateCsv = async (data, button, div) => {
  /* let blob = await new Blob([JSON.stringify(data)], {
    type: "application/pdf",
  });
  let file = await new File([blob], encodeURIComponent("fileName.pdf"));
  let element = document.createElement("a");
  element.setAttribute("href", file);
  element.setAttribute("download", "file.pdf");
  div.appendChild(element);
  element.click(); */

  /* let csvContent = JSON.stringify(data);  
  let link = document.createElement("a");
  link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent));  
  link.setAttribute("download", "my_data.csv");
  div.appendChild(link); */
  /* var blob = new Blob(["array of", " parts of ", "text file"], {type: "text/plain"});
  let url = URL.createObjectURL(blob)
  chrome.downloads.download({
    url
  }) */
};

chrome.runtime.sendMessage({ sendMeData: "send" }, function (response) {
  const { div, pre, button, inputEndpoint } = createFinalPopup();
  pre.innerText = "Please, check the data before send! \n\n";
  pre.innerText = pre.innerText + JSON.stringify(response.dataToSend, null, 2);

  button.addEventListener(
    "click",
    function () {
      sendToDatabase(response.dataToSend, button, inputEndpoint);
    },
    false
  );

  /* buttonCsv.addEventListener("click", function () {
    generateCsv(response.dataToSend, buttonCsv, div);
  }); */

  chrome.runtime.sendMessage({ finished: "finish" });
});
