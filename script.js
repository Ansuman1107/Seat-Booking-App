//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];
// Use moviesList array for displaing the Name in the dropdown menu
let selectedSeats = [];
currentMovie = moviesList[0];

let dropdown = document.querySelector("#selectMovie");
let movieNameEle = document.querySelector("#movieName");
let moviePriceEle = document.querySelector("#moviePrice");
const totalPriceElement = document.getElementById("totalPrice");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const numberOfSeatElement = document.getElementById("numberOfSeat");
const proceedBtn = document.getElementById("proceedBtn");
const cancelBtn = document.getElementById("cancelBtn");

function updateMovieInfo() {
  movieNameEle.textContent = `${currentMovie.movieName}`;
  moviePriceEle.textContent = `$ ${currentMovie.price}`;
}

function updatePriceInfo() {
  totalPrice = selectedSeats.length * currentMovie.price;
  totalPriceElement.innerText = `$ ${totalPrice}`;
  numberOfSeatElement.innerText = selectedSeats.length;
}

const updateDropDown = () => {
  // newOption.selected = "selected";
  moviesList.forEach((movie, idx) => {
    let newOption = document.createElement("option");
    newOption.value = idx;
    newOption.innerText = `${movie.movieName} $${movie.price}`;
    dropdown.appendChild(newOption);
  });

  dropdown.addEventListener("change", (evt) => {
    let idx = evt.target.value;
    currentMovie = moviesList[idx];
    updateMovieInfo();
    updatePriceInfo();
  });
  updateMovieInfo();
};

function updateSelectedSeatsHolder() {
  selectedSeatsHolder.innerHTML = ""; // Clear the previous selections

  if (selectedSeats.length === 0) {
    const noSeatSelected = document.createElement("span");
    noSeatSelected.textContent = "No Seat Selected";
    selectedSeatsHolder.appendChild(noSeatSelected);
  } else {
    selectedSeats.forEach((seat) => {
      const seatElement = document.createElement("div");
      seatElement.classList.add("selectedSeat");
      seatElement.textContent = seat;
      selectedSeatsHolder.appendChild(seatElement);
    });
  }
}

function handleSeatClick(seat, idx) {
  seat.addEventListener("click", () => {
    if (seat.classList.contains("occupied")) return;

    if (seat.classList.contains("selected")) {
      seat.classList.remove("selected");
      selectedSeats = selectedSeats.filter((s) => s !== idx);
    } else {
      seat.classList.add("selected");
      selectedSeats.push(idx);
    }
    updatePriceInfo();
    updateSelectedSeatsHolder();
  });
}

function seatSelection() {
  let seats = document.querySelectorAll("#seatCont .seat");

  seats.forEach((seat, idx) => {
    if (!seat.classList.contains("occupied")) {
      handleSeatClick(seat, idx + 1);
    }
  });
}

proceedBtn.addEventListener("click", () => {
  if (selectedSeats.length === 0) alert("Oops no seat Selected");
  else {
    alert("Yayy! Your Seats have been booked");
    const seats = document.querySelectorAll("#seatCont .seat.selected");

    seats.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("occupied");
    });
    selectedSeats = [];
    updatePriceInfo();
    updateSelectedSeatsHolder();
  }
});

cancelBtn.addEventListener("click", () => {
  const seats = document.querySelectorAll("#seatCont .seat.selected");
  seats.forEach((seat) => {
    seat.classList.remove("selected");
  });
  selectedSeats = [];
  updatePriceInfo();
  updateSelectedSeatsHolder();
});

updateDropDown();
seatSelection();
//Add eventLister to each unoccupied seat
//Add eventLsiter to continue Button
//Add eventListerner to Cancel Button
