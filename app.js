const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");
const Countrty = document.querySelector(".Countrty");
Countrty.addEventListener("click", () => {
  location.reload();
});

function getLocation() {
  fetch(
    `https://geocode.xyz/${35.920834},${74.308334}?geoit=json`
  )
    .then((response) => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Geocoding throw an error (${response.status})`);

      return response.json();
    })
    .then((data) => {
      console.log(data.country);
      const country = data.country;

      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then((response) => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then((data) => {
      console.log(data);
      showContent(data[0]);
    })
    .catch((error) => {
      errorDetect(error);
    });
}
getLocation();

const mainCountry = document.querySelector(".mainCountry");
const countryData = document.querySelector(".countryData");

const errorDetect = (err) => {
  mainCountry.style.display = "block";
  countryData.style.display = "none";
  mainCountry.innerText = `Something went wrong ${err}, Try Again!`;
};

const population = document.querySelector(".population");
const language = document.querySelector(".language");
const capital = document.querySelector(".capital");
const googleMap = document.querySelector(".googleMap");
const currency = document.querySelector(".curreny");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".subRegion");

const showContent = (cD) => {
  population.innerHTML = cD.population;
  language.innerHTML = cD.language.fra;
  capital.innerHTML = cD.capital;
  currency.innerHTML = cD.currencies.EUR.name;
  region.innerHTML = cD.region;
  subRegion.innerHTML = cD.subRegion;
  googleMap.innerHTML = cD.map.googleMap;
};
