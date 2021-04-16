let btnstrap = document.getElementById("btnstrap");

btnstrap.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: scrapingProfile,
  });
});

function scrapingProfile() {
  const cssSelectorsProfile = {
    profile: {
      name: ".pv-text-details__left-panel.mr5 h1",
      resumen: ".text-body-medium.break-words",
      // country: 'div.ph5.pb5 > div.display-flex.mt2.pv-top-card--reflow > div.pv-top-card__list-container > ul.cx.mt1 > li'
      country: "div.ph5 > div.mt2 > div > ul.mt1 > li.t-16",
      email: "div > section.pv-contact-info__contact-type.ci-email > div > a",
      phone: "div > section.pv-contact-info__contact-type.ci-phone > ul > li > span",
      urlLinkedin: "div > section.pv-contact-info__contact-type.ci-vanity-url > div > a",
      education: "div.ph5 .pv-top-card--experience-list > li ~ li",
      experience: "#experience-section li",
    },
    option: {
      buttonSeeMore: ".pv3 a",
      buttonCloseSeeMore: "button.artdeco-modal__dismiss",
    },
  };

  const wait = (milliseconds) => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, milliseconds);
    });
  };

  const autoscrollToElement = async function (cssSelector) {
    const exists = document.querySelector(cssSelector);

    while (exists) {
      let maxScrollTop = document.body.clientHeight - window.innerHeight;
      let elementScrollTop = document.querySelector(cssSelector).offsetHeight;
      let currentScrollTop = window.scrollY;

      if (maxScrollTop == currentScrollTop || elementScrollTop <= currentScrollTop) break;

      await wait(32);

      let newScrollTop = Math.min(currentScrollTop + 20, maxScrollTop);

      window.scrollTo(0, newScrollTop);
    }

    console.log("Finish autoscroll to element %s", cssSelector);

    return new Promise(function (resolve) {
      resolve();
    });
  };

  const getContactProfile = async () => {
    const {
      profile: {
        name: nameCss,
        resumen: resumenCss,
        country: countryCss,
        email: emailCss,
        phone: phoneCss,
        urlLinkedin: urlLinkedinCss,
        experience: experienceCss,
      },
      option: { buttonSeeMore: buttonSeeMoreCss, buttonCloseSeeMore: buttonCloseSeeMoreCss },
    } = cssSelectorsProfile;

    const name = document.querySelector(nameCss)?.innerText;
    const resumen = document.querySelector(resumenCss)?.innerText;
    const country = document.querySelector(countryCss)?.innerText;

    const buttonSeeMore = document.querySelector(buttonSeeMoreCss);
    buttonSeeMore.click();

    await wait(1000);

    const email = document.querySelector(emailCss)?.innerText;
    const phone = document.querySelector(phoneCss)?.innerText;

    let urlLinkedin = document.querySelector(urlLinkedinCss)?.innerText;
    if (urlLinkedin) urlLinkedin = `https://${urlLinkedin}`;

    const buttonCloseSeeMore = document.querySelector(buttonCloseSeeMoreCss);
    buttonCloseSeeMore.click();

    await autoscrollToElement("body");

    let experience = [];
    document.querySelectorAll(experienceCss).forEach((el) => {
      experience.push({
        name: el.querySelector("h3").textContent,
        entity: el.querySelector(".pv-entity__secondary-title")?.firstChild.wholeText.trim(),
        scheduleType: el.querySelector(".pv-entity__secondary-title span")?.innerText,
        timeRange: el.querySelectorAll("h4")[0]?.querySelectorAll("span")[1]?.innerText,
        time: el.querySelectorAll("h4")[1]?.querySelectorAll("span")[1]?.innerText,
        place: el.querySelectorAll("h4")[2]?.querySelectorAll("span")[1]?.innerText,
      });
    });

    return { name, resumen, country, email, phone, urlLinkedin, experience };
  };

  const getProfile = async () => {
    const profile = await getContactProfile();

    console.log(profile);

    document.body.innerHTML = `<div><b>name:</b> ${profile.name}</div><div><b>phone:</b> ${profile.phone}</div><div><b>resume:</b> ${profile.resumen}</div><div><b>url:</b> ${profile.urlLinkedin}</div><br/><div><b>Experience:</b></div>`;

    let experience = "";
    profile.experience.forEach((el) => {
      experience =
        experience +
        `
        <br/><ul>
      <li>entity: ${el.entity};</li>
      <li>name: ${el.name};</li>
      <li>place: ${el.place};</li>
      <li>scheduleType: ${el.scheduleType};</li>
      <li>time: ${el.time};</li>
      <li>timeRange: ${el.timeRange};</li>
      </ul>`;
    });
    console.log(experience);

    document.body.innerHTML = document.body.innerHTML + `${experience}`;
  };

  getProfile();
}
