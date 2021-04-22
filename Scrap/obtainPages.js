(async () => {
  await autoscrollToElement("body");
  let pages = document.querySelector(".artdeco-pagination__pages li:last-child span").innerText;

  chrome.runtime.sendMessage({ pages });
})().catch((err) => {
  console.error(err);
});
