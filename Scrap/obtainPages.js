(async () => {
  await autoscrollToElement("body");
  /* let pages = document.querySelector(".artdeco-pagination__pages li:last-child span").innerText; */
  let pages = -1;
  let pagesElement = document.querySelector(".artdeco-pagination__pages li:last-child span");
  if (pagesElement) {
    pages = pagesElement.innerText;
  }

  chrome.runtime.sendMessage({ pages });
})().catch((err) => {
  console.error(err);
});
