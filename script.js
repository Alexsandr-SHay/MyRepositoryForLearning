"use strict";

let title = prompt("Как называется наш проект");
let screens = prompt("Какие типы экранов нужно разработать");
let screenPrice = +prompt("Сколько будет стоить данная работа");
let adaptive = confirm("Нужен ли адаптив на сайте");
let service1 = prompt("Какой тип услуги нужен");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой тип услуги нужен");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = Math.random() * 100;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

const showTypeOF = function (variable) {
  console.log(variable, typeof variable);
};

const getRollBackMessage = function (price) {
  switch (true) {
    case price > 30000:
      return "Даем скидку в 10%";
      break;
    case price > 15000 && price <= 30000:
      return "Даем скидку в 5%";
      break;
    case price > 0 && price <= 15000:
      return "Скидка не предусмотрена";
      break;
    default:
      return "Что то пошло не так";
  }
};

showTypeOF(title);
showTypeOF(screenPrice);
showTypeOF(adaptive);

console.log(getRollBackMessage(fullPrice));
console.log(screens.length);
console.log(
  "Стоимость верстки экранов " +
    screenPrice.toFixed(2) +
    " рублей, " +
    "Стоимость разработки сайта " +
    fullPrice.toFixed(2) +
    " рублей."
);
