let elRow = document.querySelector(".js_row");
let elCard = document.querySelector(".card-up");
let elSelect = document.querySelector(".form-select");
let elSelectSort = document.querySelector(".form-sort");
let elInput = document.querySelector(".js_input");
let elModeBtn = document.querySelector(".mode");
let elBookmarkList = document.querySelector(".list-group");
let elBookMarkWrapper = document.querySelector(".bookmark-wrapper");
let elBookMarkBtn = document.querySelector(".form-bookmark");
let elBookHtmlIcon = document.querySelector(".icon");
let elBookmarkNewIcon = document.querySelector(".bookmark-new");
let elBookmarkSucces = document.querySelector(".alert");

// Dark mode
let theme = false;

elModeBtn.addEventListener("click", function () {
  theme = !theme;

  const bgTheme = theme ? "dark" : "light";
  window.localStorage.setItem("theme", bgTheme);
  changeTheme();
});
function changeTheme() {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
changeTheme();
// Dark mode

let film = [];

function filmFunc(array, node) {
  elRow.innerHTML = "";
  array.forEach((el) => {
    let elCard = document.createElement("div");
    elCard.setAttribute("class", "mb-5 col-12 col-sm-12 col-md-3");
    elCard.innerHTML = `
    <div class="card-bt p-4 border border-1">
    <img src="${
      el.poster
    }" width='200' class="card border-0 mx-auto d-block mb-3" alt="Card image">
          <div class="card-body text-center">
          <hr class='text-white'>
          <div>
          <span class='card-text text-white'>ID:${el.id}</span>
                  <i style="color: gold;" class="fa-solid fa-star"></i>
                  <span class='spans text-white'>${Math.floor(
                    Math.random() * 9 + 2
                  )}</span>
              </div>
              <div>
              <p class='card-text text-secondary'>${Math.floor(
                Math.random() * 9 + 2
              )} Seasons</p>
                  <p class='card-text text-white'>Title: ${el.title}</p>
                  <p class='card-text text-white'>Release date: ${
                    el.release_date
                  }</p>
              </div>
          </div>
          </div>
          `;

    let newBookBtn = document.createElement("button");
    newBookBtn.setAttribute(
      "class",
      "border border-0 bg-transparent js-bookbtn fa-solid fa-bookmark fs-3 me-3 js-addBook"
    );
    newBookBtn.dataset.bookmark = el.id;

    elCard.appendChild(newBookBtn);
    node.appendChild(elCard);
  });
}

filmFunc(film, elRow);

let filmArr = [];

films.forEach((element) => {
  element.genres.forEach((elType) => {
    filmArr.push(elType);
    // console.log(filmArr);
  });
});

// Sort
let sortedFilm = new Set(filmArr);
// Sort
films.forEach((el1) => {
  el1.genres.forEach((item) => {
    sortedFilm.add(item);
  });
});
// Sorted and render to select
sortedFilm.forEach((el) => {
  let newOption = document.createElement("option");
  newOption.setAttribute("value", el);
  newOption.textContent = el;
  elSelect.appendChild(newOption);
});
// Sorted and render to select

let newArr = [];
elSelect.addEventListener("change", function (evt) {
  // newArr = [];
  evt.preventDefault();
  newArr = [];

  if (elSelect.value != "All") {
    films.forEach((items) => {
      if (items.genres.includes(elSelect.value)) {
        newArr.push(items);
      }
    });
    filmFunc(newArr, elRow);
  } else {
    filmFunc(film, elRow);
  }
});

// INPUT SEARCH
let newInput = [];
elInput.addEventListener("keyup", function () {
  newInput = [];
  films.forEach((item) => {
    if (
      item.title.toLocaleLowerCase().includes(elInput.value.toLocaleLowerCase())
    ) {
      newInput.push(item);
    }
  });
  filmFunc(newInput, elRow);
});

//* Sort
let newSorted = [];
elSelectSort.addEventListener("change", function () {
  newSorted = [];
  films.forEach((el) => {
    newSorted.push(el);
    newSorted.sort(
      (a, b) =>
        a.title.toUpperCase().charCodeAt(0) -
        b.title.toUpperCase().charCodeAt(0)
    );
  });
  console.log(newSorted);

  if (elSelectSort.value === "a_z") {
    newSorted.sort(
      (a, b) =>
        a.title.toUpperCase().charCodeAt(0) -
        b.title.toUpperCase().charCodeAt(0)
    );
  }
  if (elSelectSort.value === "z_a") {
    newSorted.sort(
      (a, b) =>
        b.title.toUpperCase().charCodeAt(0) -
        a.title.toUpperCase().charCodeAt(0)
    );
  }
  filmFunc(newSorted, elRow);
});

// Bookmark
elBookMarkBtn.addEventListener("click", () => {
  elBookMarkWrapper.classList.toggle("bookmark-wrapper-active");
});
// Bookmark

let newBook = new Set();
elRow.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-addBook")) {
    const getId = evt.target.dataset.bookmark;
    const foundTitle = films.find((el) => el.id == getId);
    newBook.add(foundTitle);

    const newLi = document.createElement("li");
    newLi.className = "list-group-item";
    newLi.innerHTML = `<i class='fa-regular fa-bookmark'></i> Your liked film: ${foundTitle.title}`;

    elBookmarkList.appendChild(newLi);
    elBookHtmlIcon.classList.add("d-none");
    elBookmarkNewIcon.classList.remove("d-none");
    elBookmarkSucces.classList.remove("d-none");
    setTimeout(() => {
      elBookmarkSucces.classList.add("d-none");
    }, 2000);
  }
});
