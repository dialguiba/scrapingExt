let inputStrap = document.getElementById("inputstrap");
let message = document.getElementById("message");
let formstrap = document.getElementById("formstrap");
let fieldRadioButtons = document.getElementById("radioButtons");
let loadingRing = document.getElementById("loadingRing");

let dataToSend = [];
let links = [];
let pagesUrls = [];

const wait = (milliseconds) => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, milliseconds);
  });
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function getSelectedRadio(name) {
  let radios = formstrap.elements[name];
  let selected;

  radios.forEach((radio) => {
    if (radio.checked) selected = radio.value;
  });

  return selected;
}

formstrap.addEventListener("submit", async (e) => {
  e.preventDefault();
  links = [];
  dataToSend = [];
  pagesUrls = [];
  loadingRing.style.display = "block";
  let input = inputStrap.value;
  message.innerText = "Please, dont close this window pop up until scrapping has finished and the file has been downloaded.";
  let selectedRadio = getSelectedRadio("contactType");

  chrome.tabs.update({ url: `https://www.linkedin.com/search/results/people/?keywords=${input}&network=%22${selectedRadio}%22&origin=FACETED_SEARCH` });

  await wait(6000);

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (activeTab) {
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      files: ["./Scrap/obtainPages.js"],
    });
  } else {
    const pAlert = document.getElementById("alert");
    pAlert.innerText = "No se tiene permiso para los tabs.";
  }

  chrome.runtime.onMessage.addListener(async function doStuff(request, sender, sendResponse) {
    if (request.pages) {
      if (request.pages == -1) {
        console.log(links, dataToSend, pagesUrls);
        console.log(request.pages);
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ["./Scrap/init.js"],
        });

        await wait(5000);

        await asyncForEach(links, async (el) => {
          chrome.tabs.update({ url: el });

          await wait(5000);

          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: ["./Scrap/individualProfile.js"],
          });

          await wait(11000);
        });

        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ["./Scrap/allData.js"],
        });
      } else {
        for (let i = 1; i <= parseInt(request.pages); i++) {
          pagesUrls.push(`https://www.linkedin.com/search/results/people/?keywords=${input}&network=%22${selectedRadio}%22&origin=FACETED_SEARCH&page=${i}`);
        }

        await asyncForEach(pagesUrls, async (url) => {
          chrome.tabs.update({
            url,
          });
          await wait(5000);

          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: ["./Scrap/init.js"],
          });

          await wait(5000);
        });

        await asyncForEach(links, async (el) => {
          chrome.tabs.update({ url: el });

          await wait(5000);

          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files: ["./Scrap/individualProfile.js"],
          });

          await wait(11000);
        });

        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ["./Scrap/allData.js"],
        });
      }
    } else if (request.links) {
      links.push(...request.links);
    } else if (request.profile) {
      dataToSend.push(request.profile);
    } else if (request.sendMeData) {
      sendResponse({ dataToSend });
      /*  */
      const dataPrepared = convertToCSV(dataToSend);

      let csvContent = "data:text/csv;charset=utf-8," + dataPrepared;

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_data.csv");
      document.body.appendChild(link); // Required for FF

      link.click();
    } else if (request.finished) {
      chrome.runtime.onMessage.removeListener(doStuff);
      loadingRing.style.display = "none";
      message.innerText = "FINISHED";
    }
  });
});

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array.map((it) => (typeof it !== "object" ? Object.values(it).toString() : JSON.stringify(it))).join("\n");
}
