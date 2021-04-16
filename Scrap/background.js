const cssSelectorsProfile = {
  profile: {
    name: ".pv-text-details__left-panel.mr5 h1",
    resumen: ".text-body-medium.break-words",
    country: "div.ph5 > div.mt2 > div > ul.mt1 > li.t-16",
    email: "div > section.pv-contact-info__contact-type.ci-email > div > a",
    phone: "div > section.pv-contact-info__contact-type.ci-phone > ul > li > span",
    urlLinkedin: "div > section.pv-contact-info__contact-type.ci-vanity-url > div > a",
    education: "div.ph5 .pv-top-card--experience-list > li ~ li",
    experience: "#experience-section li",
  },
  about: {
    about: "div > section.pv-about-section > p.pv-about__summary-text",
  },
  experience: {
    experience: "div.pv-profile-section-pager > section#experience-section > ul.section-info",
    experienceChildren: "li.pv-profile-section__list-item > section.pv-profile-section",
    experienceChildrenTitle: "div > div.pv-entity__company-summary-info > h3 > span:nth-child(2)",
    experienceChildrenTitle2: "div.pv-entity__summary-info.pv-entity__summary-info--background-section > h3",
    experienceChildrenDuration: "div > div.pv-entity__company-summary-info > h4 > span:nth-child(2)",
    experienceChildrenDuration2:
      "div.pv-entity__summary-info.pv-entity__summary-info--background-section > div > h4.pv-entity__date-range.t-14.t-black--light.t-normal > span:nth-child(2)",
    experienceChildrenJobs: "ul.pv-entity__position-group",
    experienceChildrenJobsTitle: "div.pv-entity__role-details > div > div.pv-entity__role-container > div > div > h3 > span:nth-child(2)",
    experienceChildrenJobsDirection: "div > div > div.pv-entity__role-container > div > div > h4 > span:nth-child(2)",
    experienceChildrenJobsDirection2: "div.pv-entity__summary-info.pv-entity__summary-info--background-section > h4 > span:nth-child(2)",
    experienceChildrenJobsDirection3:
      "div > div > div.pv-entity__role-container > div > div > div > h4.pv-entity__date-range.t-14.t-black--light.t-normal > span:nth-child(2)",
  },
  option: {
    buttonSeeMore: ".pv3 a",
    buttonCloseSeeMore: "button.artdeco-modal__dismiss",
    buttonAboutSeeMore: "line-clamp-show-more-button",
    buttonExperienceSeeMore: "button.pv-profile-section__see-more-inline",
    buttonExperienceCloseSeeMore: "button.pv-profile-section__see-less-secondary-inline",
  },
};

/* scrapingProfile(); */

let topic = "topic";
let input = document.querySelector('[placeholder="Buscar"]');
let ev = document.createEvent("Event");

ev.initEvent("keydown");
ev.which = ev.keyCode = 13;
input.value = "test";
input.dispatchEvent(ev);

document.querySelectorAll(".pv2").forEach((profilesContainer) => {
  console.log(profilesContainer);
  profilesContainer.querySelectorAll("li").forEach((profile) => {
    console.log(profile);
  });
});
