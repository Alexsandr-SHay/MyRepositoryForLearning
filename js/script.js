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
    const checkErrorBind = appData.checkError.bind(appData);
    const resetBind = appData.reset.bind(appData);
    const addScreenBlockBind = appData.addScreenBlock.bind(appData);
    const changingSliderRollbackBind =
      appData.changingSliderRollback.bind(appData);

    appData.addTitle();
    startBtn.addEventListener("click", checkErrorBind);
    resetBtn.addEventListener("click", resetBind);
    buttonPlus.addEventListener("click", addScreenBlockBind);
    inputRange.addEventListener("input", changingSliderRollbackBind);
  },

  addTitle() {
    document.title = title.textContent;
  },

  start: function () {
    const addScreensBind = appData.addScreens.bind(appData);
    const addServicesBind = appData.addServices.bind(appData);
    const addPricesBind = appData.addPrices.bind(appData);
    const showResultBind = appData.showResult.bind(appData);
    const resetBtnBind = appData.resetBtn.bind(appData);

    addScreensBind();
    addServicesBind();
    addPricesBind();
    showResultBind();
    if (!this.isError) {
      resetBtnBind();
    }
  },

  changingSliderRollback: function (event) {
    if (!this.isError) {
      this.rollback = event.target.value;
      inputRangeValue.innerText = this.rollback + "%";
      totalCountRollBack.value =
        this.saveFullPrice - this.saveFullPrice * (this.rollback / 100);
    }
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollBack.value = this.servicePercentPrice;
    totalCount.value = this.numberOfScreens;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });

    console.log(this.screens);
  },

  checkError: function () {
    screens = document.querySelectorAll(".screen");
    this.isError = false;
    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      if (select.value === "" || input.value === "") this.isError = true;
    });
    if (!this.isError) {
      this.start();
    }
  },

  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function () {
    this.saveFullPrice = 0; //обнуление
    this.screenPrice = this.screens.reduce((sum, value) => {
      return sum + +value.price;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);

    for (let key of this.screens) {
      this.numberOfScreens += +key.count;
    }

    this.saveFullPrice = this.fullPrice; // сохранение значения
  },

  resetBtn: function () {
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
    buttonPlus.setAttribute("disabled", true);
  },

  reset: function () {
    this.resetScreens();
    this.screens = [];
    this.screenPrice = 0;
    this.numberOfScreens = 0;
    this.adaptive = true;
    this.rollback = 0;
    this.fullPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    inputRange.value = 0;
    inputRangeValue.innerText = "0%";
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    this.isError = false;

    checkbox.forEach((checkbox) => {
      checkbox.checked = false;
    });
    buttonPlus.removeAttribute("disabled");
    this.showResult();
  },

  resetScreens: function () {
    this.screens.forEach((screen, index) => {
      const elem = document.querySelector(".screen");
      const input = elem.querySelector("input");
      if (index === this.screens.length - 1) {
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
