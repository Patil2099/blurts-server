"use strict";

const { LocaleUtils } = require("./../locale-utils");
const { makeBreachCards } = require("./breaches");

function getBreachesForEachEmail(args) {
  const verifiedEmails = args.data.root.verifiedEmails;
  const locales = args.data.root.req.supportedLocales;
  let breachesFound = false;

  verifiedEmails.forEach(email => {
    const breachCards = makeBreachCards(email.breaches, locales);
    email.foundBreaches = {};
    email.foundBreaches.firstFourBreaches = breachCards.slice(0, 4);
    email.foundBreaches.remainingBreaches = breachCards.slice(4, breachCards.length);
    email.foundBreaches.cardType = "two-up ec drop-shadow";
    email.breaches = breachCards;
    if (email.breaches.length > 0) {
      breachesFound = true;
    }
    if (email.hasNewBreaches) {
      email.newBreachMessage = LocaleUtils.fluentFormat(locales, "new-breaches-found", { breachCount: email.hasNewBreaches });
    }
  });
  const emailCards = {
    verifiedEmails: verifiedEmails,
    breachesFound: breachesFound,
  };
  return args.fn(emailCards);
}

function welcomeMessage(args) {
  const locales = args.data.root.req.supportedLocales;
  const userEmail = `<span class="bold">${args.data.root.req.session.user.fxa_profile_json.email}</span>`;
  if (args.data.root.req.session.newUser) {
    return LocaleUtils.fluentFormat(locales, "welcome-user", { userName: userEmail });
  }

  return LocaleUtils.fluentFormat(locales, "welcome-back", { userName: userEmail});
}


function getUserPreferences(args) {
  const csrfToken = args.data.root.csrfToken;
  const unverifiedEmails = args.data.root.unverifiedEmails;
  const verifiedEmails = args.data.root.verifiedEmails;
  const primaryEmail = verifiedEmails.shift();
  const sessionUser = args.data.root.req.session.user;
  const communicationOption = (sessionUser.all_emails_to_primary) ? 1 : 0;

  const locales = args.data.root.req.supportedLocales;
  args.data.root.preferences = true;

  const emailAddresses = {
    primary: {
      subhead: LocaleUtils.fluentFormat(locales, "fxa-primary-email"),
      className: "fxa-primary-email",
      email_addresses: [ primaryEmail ], // put in array for template looping
    },
    secondary: {
      subhead: LocaleUtils.fluentFormat(locales, "other-monitored-emails"),
      className: "other-monitored-emails",
      email_addresses: verifiedEmails,
    },
    unverified: {
      subhead: LocaleUtils.fluentFormat(locales, "email-verification-required"),
      className: "email-verification-required",
      email_addresses: unverifiedEmails,
    },
  };

  const communicationOptions = [
    {
      optionDescription: "Send breach alerts to the affected email address.",
      labelString: LocaleUtils.fluentFormat(locales, "comm-opt-0", {primaryEmail: `<span class="bold">${primaryEmail.email}</span>`}),
      optionId: "0",
      optionChecked: (communicationOption === 0) ? "checked" : "",
    },
    {
      optionDescription: "Send all breach alerts to subscriber's primary email address.",
      labelString: LocaleUtils.fluentFormat(locales, "comm-opt-1", {primaryEmail: `<span class="bold">${primaryEmail.email}</span>`}),
      optionId: "1",
      optionChecked: (communicationOption === 1) ? "checked" : "",
    },
  ];

  const user = {
    primaryEmail: primaryEmail.email,
    emails : emailAddresses,
    communicationOptions: communicationOptions,
    csrfToken: csrfToken,
  };

  return args.fn(user);
}


module.exports = {
  getUserPreferences,
  getBreachesForEachEmail,
  welcomeMessage,
};
