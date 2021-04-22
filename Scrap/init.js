(async () => {
  let links = [];

  await autoscrollToElement("body");

  await document.querySelectorAll(".pv2").forEach((block) => {
    block.querySelectorAll(".reusable-search__result-container").forEach((profileElement) => {
      links.push(profileElement.querySelector("a").toString());
    });
  });

  chrome.runtime.sendMessage({ links });
})().catch((err) => {
  console.error(err);
});
