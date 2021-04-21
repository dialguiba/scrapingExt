/* getPages(); */

(async () => {
  let profileLinks = [];

  await autoscrollToElement("body");

  document.querySelectorAll(".pv2").forEach((block) => {
    block.querySelectorAll("li").forEach((profileElement) => {
      profileLinks.push(profileElement.querySelector("a").toString());
    });
  });

  let port = chrome.runtime.connect();
  port.postMessage({ profileLinks });
})().catch((err) => {
  console.error(err);
});
