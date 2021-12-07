// Select DOM elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

// initialize array
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// get random user
// fetch user from an open API
async function getRandomUser() {
  //fetch("https://randomuser.me/api");
  //fetch("https://randomuser.me/api").then(res => res.json()).then()
  const res = await fetch("https://randomuser.me/api");

  const data = await res.json();

  // log our data
  //console.log(data);
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    // grabbing the first and last name of the user in the results array
    money: Math.floor(Math.random() * 1000000),
  };

  //console.log(newUser);
  addData(newUser);
}

// double everyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// sort by richest person
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// show ony millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  //console.log(formatMoney(wealth));

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// add new user to data array
function addData(obj) {
  data.push(obj);
  // using push method to add new user obj onto the empty array

  // update the DOM
  updateDOM();
}

// update the DOM
function updateDOM(providedData = data) {
  // parameter has default value of whatever our data array contains
  // if no parameter is passed it's set to whatever is in the data array

  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  //providedData.forEach(function(person) {
  //})

  providedData.forEach((person) => {
    // create a brand new element for each person
    const element = document.createElement("div");
    // add a css class onto the new div
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;

    // we need to insert it inot the DOM
    main.appendChild(element);
  });
}

// format money
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// event listeners
addUserBtn.addEventListener("click", getRandomUser);
// get a random user when we click the button
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
