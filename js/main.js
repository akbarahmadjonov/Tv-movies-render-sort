let elRow = document.querySelector(".js_row");
let elCard = document.querySelector(".card-up");
let elSelect = document.querySelector(".form-select");
let elSelectSort = document.querySelector(".form-sort");
let elInput = document.querySelector(".js_input");

function filmFunc(array, node) {
  elRow.innerHTML = "";
  array.forEach((el) => {
    var elCard = document.createElement("div");
    elCard.setAttribute("class", "col-12 col-sm-12 col-md-3");
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

    node.appendChild(elCard);
  });
}

filmFunc(films, elRow);

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
    filmFunc(films, elRow);
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
