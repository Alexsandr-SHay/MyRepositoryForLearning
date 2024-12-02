let title = "MyRepositoryForLearning";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = Math.random() * 100000;
let rollback = Math.random() * 100;
let fullPrice = 1000000;
let adaptive = true;

console.log(title);
console.log(fullPrice);
console.log(adaptive);
console.log(screens.length);
console.log(
  "Стоимость верстки экранов " +
    screenPrice.toFixed(2) +
    " рублей, " +
    "Стоимость разработки сайта " +
    fullPrice.toFixed(2) +
    " рублей."
);
console.log(screens.toLowerCase().split(" "));
console.log(
  "Процент отката посреднику за работу " +
    (fullPrice * (rollback / 100)).toFixed(2)
);
