"use strict";

const AppConstants = require("./app-constants");
const { LocaleUtils } = require("./locale-utils");
const modifiedStringMap = require("./modified-strings");
const mozlog = require("./log");


const log = mozlog("hbs-helpers");


function fluentFormat (supportedLocales, id, args) {
  return LocaleUtils.fluentFormat(supportedLocales, id, args.hash);
}


function fluentFxa (supportedLocales, id, args) {
  if (AppConstants.FXA_ENABLED) {
    id = `fxa-${id}`;
  }
  return LocaleUtils.fluentFormat(supportedLocales, id, args.hash);
}


function getStringID (supportedLocales, id, number) {
  id = `${id}${number}`;
  if (modifiedStringMap[id]) {
    id = modifiedStringMap[id];
  }
  return LocaleUtils.fluentFormat(supportedLocales, id);
}


function localizedBreachDataClasses(supportedLocales, dataClasses, args) {
    const localizedDataClasses = [];
    dataClasses.forEach(dataClass => {
      localizedDataClasses.push(LocaleUtils.fluentFormat(supportedLocales, dataClass, args));
    });
    return localizedDataClasses.join(", ");
}


function fluentNestedBold(supportedLocales, id, args) {
  const saveArgs = JSON.parse(JSON.stringify(args.hash));
  const nonNumericStringIds = Object.keys(saveArgs).filter(key => key !== "breachCount");

  const addMarkup = (word) => {
    return ` <span class="medium">${word}</span> `;
  };

  nonNumericStringIds.forEach(stringId => {
    args.hash[stringId] = stringId;
  });

  let localizedStrings = LocaleUtils.fluentFormat(supportedLocales, id, args.hash);

  if (args.hash.breachCount) {
    localizedStrings = localizedStrings.replace(/(\s[\d]+\s)/, addMarkup(args.hash.breachCount));
  }

  nonNumericStringIds.forEach(stringId => {
    localizedStrings = localizedStrings.replace(stringId, addMarkup(saveArgs[stringId]));
  });

  return localizedStrings;
}


function prettyDate(supportedLocales, date) {
  const jsDate = new Date(date);
  const options = {year: "numeric", month: "long", day: "numeric"};
  const intlDateTimeFormatter = new Intl.DateTimeFormat(supportedLocales, options);
  return intlDateTimeFormatter.format(jsDate);
}


function localeString(supportedLocales, numericInput) {
  const intlNumberFormatter = new Intl.NumberFormat(supportedLocales);
  return intlNumberFormatter.format(numericInput);
}

function getFxaUrl() {
  return AppConstants.FXA_SETTINGS_URL;
}


function eachFromTo(ary, min, max, options) {
  if(!ary || ary.length === 0)
      return options.inverse(this);

  const result = [];

  for (let i = min; i < max && i < ary.length; i++) {
    result.push(options.fn(ary[i], { data : { itemIndex : i } } ));
  }
  return result.join("");
}

function loop(from, to, inc, block) {
  block = block || {fn: function () { return arguments[0]; }};
  const data = block.data || {index: null};
  let output = "";
  for (let i = from; i <= to; i += inc) {
      data["index"] = i;
      output += block.fn(i, {data: data});
  }
  return output;
}


function ifCompare(v1, operator, v2, options) {
  //https://stackoverflow.com/questions/28978759/length-check-in-a-handlebars-js-if-conditional
  const operators = {
    ">": v1 > v2 ? true : false,
    ">=": v1 >= v2 ? true : false,
    "<": v1 < v2 ? true : false,
    "<=": v1 <= v2 ? true : false,
    "===": v1 === v2 ? true : false,
    "&&" : v1 && v2 ? true : false,
    "||" : v1 || v2 ? true : false,
    "!|" : !v1 || !v2 ? true : false,
    "!!" : !v1 && !v2  ? true : false,
  };
  if (operators.hasOwnProperty(operator)) {
    if (operators[operator]) {
      return options.fn(this);
    }
    return options.inverse(this);
  }
  log.error("ifCompare", {message: `${operator} not found`});
  return;
}


function breachMath(lValue, operator = null, rValue = null) {
  lValue = parseFloat(lValue);
  let returnValue = lValue;
  if (operator) {
      rValue = parseFloat(rValue);
    returnValue = {
      "+": lValue + rValue,
      "-": lValue - rValue,
      "*": lValue * rValue,
      "/": lValue / rValue,
      "%": lValue % rValue,
    }[operator];
  }
  return returnValue;
}

const breachAlertFaq = (args) => {
  const supportedLocales = args.data.root.supportedLocales;
  const faqs = [
    {
      "stringId" : "faq1",
      "stringDescription": "I don't recognize this website. Why am I in this breach?",
      "href": "https://support.mozilla.org/kb/firefox-monitor-faq#w_i-donaot-recognize-this-company-or-website-why-am-i-in-this-breach",
    },
    {
      "stringId" : "faq2",
      "stringDescription": "Why did it take so long to notify me of this breach?",
      "href": "https://support.mozilla.org/kb/firefox-monitor-faq#w_how-far-back-do-data-breaches-in-the-firefox-monitor-database-go",
    },
    {
      "stringId" : "faq3",
      "stringDescription": "How do I know this is a legitimate email from Firefox Monitor?",
      "href": "https://support.mozilla.org/kb/firefox-monitor-faq#w_how-do-i-know-these-emails-are-really-from-firefox-and-not-from-a-hacker",
    },
  ];
  faqs.forEach(faq => {
    faq.stringId = fluentFormat(supportedLocales, faq.stringId, args);
  });
  return faqs;
};


module.exports = {
  fluentFormat,
  fluentFxa,
  getStringID,
  fluentNestedBold,
  localizedBreachDataClasses,
  prettyDate,
  localeString,
  getFxaUrl,
  eachFromTo,
  ifCompare,
  breachMath,
  loop,
  breachAlertFaq,
};
