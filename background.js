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

let dataToSend = [];

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(async function (msg) {
    if (msg.profileLinks) {
      let links = msg.profileLinks;
      await asyncForEach(links, async (el) => {
        chrome.tabs.update({ url: el });
        await wait(15000);
      });

      console.log("dataAEnviar", dataToSend);

      await wait(3000);
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["./Scrap/allData.js"],
      });
    } else if (msg.loaded) {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["./Scrap/individualProfile.js"],
      });
    } else if (msg.profile) {
      dataToSend.push(msg.profile);
    } else if (msg.sendMeData) {
      port.postMessage({ dataToSend });
    } else if (msg.input) {
      chrome.tabs.update({ url: `https://www.linkedin.com/search/results/people/?keywords=${msg.input}&network=%22F%22&origin=FACETED_SEARCH` });

      await wait(6000);

      port.postMessage({ init: "init" });
    }
  });
});
