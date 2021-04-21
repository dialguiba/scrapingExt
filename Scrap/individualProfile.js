(async () => {
  await wait(3000);
  scrapingProfile();
})().catch((err) => {
  console.error(err);
});
