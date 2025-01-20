"use strict";
const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const checkbox = document.querySelectorAll(".custom-checkbox");

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
    startBtn.addEventListener("click", this.checkError);
    resetBtn.addEventListener("click", this.reset);
    buttonPlus.addEventListener("click", this.addScreenBlock);
    inputRange.addEventListener("input", this.changingSliderRollback);
  },

  addTitle() {
    document.title = title.textContent;
  },

  start: () => {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    if (!appData.isError) {
      appData.resetBtn();
    }
  },

  changingSliderRollback: (event) => {
    if (!appData.isError) {
      rollback = event.target.value;
      inputRangeValue.innerText = this.rollback + "%";
      totalCountRollBack.value =
        this.saveFullPrice - this.saveFullPrice * (this.rollback / 100);
    }
  },

  showResult: () => {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollBack.value = appData.servicePercentPrice;
    totalCount.value = appData.numberOfScreens;
  },

  addScreens: () => {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
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

    console.log(this.screens);
  },

  checkError: () => {
    screens = document.querySelectorAll(".screen");
    appData.isError = false;
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      if (select.value === "" || input.value === "") appData.isError = true;
    });
    if (!appData.isError) {
      appData.start();
    }
  },

  addServices: () => {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: () => {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: () => {
    appData.saveFullPrice = 0; //обнуление
    appData.screenPrice = appData.screens.reduce((sum, value) => {
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

  resetBtn: () => {
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
    buttonPlus.setAttribute("disabled", true);
  },

  reset: () => {
    appData.resetScreens();
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
    inputRange.value = 0;
    inputRangeValue.innerText = "0%";
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    appData.isError = false;

    checkbox.forEach((checkbox) => {
      checkbox.checked = false;
    });
    buttonPlus.removeAttribute("disabled");
    appData.showResult();
  },

  resetScreens: () => {
    appData.screens.forEach((screen, index) => {
      const elem = document.querySelector(".screen");
      const input = elem.querySelector("input");
      if (index === appData.screens.length - 1) {
        document.querySelector("option[selected]").selected = true;
        input.value = "";
      } else {
        input.value = "";
        elem.remove();
      }
    });
  },
};

appData.init();
