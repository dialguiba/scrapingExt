let inputStrap = document.getElementById("inputstrap");
let message = document.getElementById("message");
let formstrap = document.getElementById("formstrap");

let dataToSend = [];
let links = [];

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

formstrap.addEventListener("submit", async (e) => {
  e.preventDefault();
  let input = inputStrap.value;
  message.innerText = "Please, dont close this window until scrapping has finished";

  chrome.tabs.update({ url: `https://www.linkedin.com/search/results/people/?keywords=${input}&network=%22F%22&origin=FACETED_SEARCH` });

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

  let links = [];

  chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.pages) {
      console.log(request.pages);

      if (request.pages == -1) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ["./Scrap/init.js"],
        });

        await wait(5000);

        await asyncForEach(links, async (el) => {
          chrome.tabs.update({ url: el });

          /* carga de página */
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
        let pagesUrls = [];

        for (let i = 1; i <= parseInt(request.pages); i++) {
          pagesUrls.push(`https://www.linkedin.com/search/results/people/?keywords=${input}&network=%22F%22&origin=FACETED_SEARCH&page=${i}`);
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

          /* carga de página */
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
    }
  });
});
