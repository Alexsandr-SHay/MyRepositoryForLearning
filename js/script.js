"use strict";
const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollBack = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  numberOfScreens: 0,
  adaptive: true,
  rollback: 0,
  fullPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isError: false,
  saveFullPrice: 0,
  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.checkError);
    buttonPlus.addEventListener("click", appData.addScreenBlock);
    inputRange.addEventListener("input", appData.changingSliderRollback);
  },

  addTitle() {
    document.title = title.textContent;
  },

  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    console.log(appData);
    console.log(inputRange.value);
    appData.showResult();

    appData.reset();
  },

  changingSliderRollback: function (event) {
    appData.rollback = event.target.value;
    inputRangeValue.innerText = appData.rollback + "%";
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollBack.value = appData.servicePercentPrice;
    totalCount.value = appData.numberOfScreens;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });

    console.log(appData.screens);
  },

  checkError: function () {
    screens = document.querySelectorAll(".screen");
    appData.isError = false;
    screens.forEach(function (screen) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      if (select.value === "" || input.value === "") appData.isError = true;
    });
    if (!appData.isError) {
      appData.start();
    }
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  checkString: function (question) {
    let str;
    do {
      str = prompt(question);
    } while (!Number.isNaN(Number(str)));
    {
      return str;
    }
  },

  addPrices: function () {
    appData.saveFullPrice = 0; //обнуление
    appData.screenPrice = appData.screens.reduce(function (sum, value) {
      return sum + +value.price;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;

    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);

    for (let key of appData.screens) {
      appData.numberOfScreens += +key.count;
    }

    appData.saveFullPrice = appData.fullPrice; // сохранение значения
  },

  rollbackNow: function (event) {
    appData.rollback = event.target.value;
    inputRangeValue.innerText = appData.rollback + "%";
    appData.servicePercentPrice =
      appData.saveFullPrice - appData.saveFullPrice * (appData.rollback / 100);
    totalCountRollBack.value = appData.servicePercentPrice;

    /*функция очень сильно перегружена по результату:
    1. Она принимает значение 
    2. Производит расчёт
    3. Выводит результат 
    Не знаю насколько это правильно с точки зрения code style, но с учётом того что она используется только в одном месте разбивать её на подфункции не вижу смысла 
    */
  },

  reset: function () {
    appData.title = "";
    appData.screens = [];
    appData.screenPrice = 0;
    appData.numberOfScreens = 0;
    appData.adaptive = true;
    appData.rollback = 0;
    appData.fullPrice = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.servicePercentPrice = 0;
    appData.servicesPercent = {};
    appData.servicesNumber = {};
  },
};

appData.init();
inputRange.addEventListener("input", appData.rollbackNow);
