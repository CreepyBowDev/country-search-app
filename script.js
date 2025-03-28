const input = document.querySelector("input");
const button = document.querySelector(".btn");
const display = document.querySelector(".display");

button.addEventListener('click', () => {
    const countryName = input.value.trim();
    if (countryName) {
        getCountryData(countryName);
    }
});

async function getCountryData(name) {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Pais no encontrado");
        }

        const data = await response.json();
        showCountry(data[0]);
    } catch (error) {
        display.innerHTML = '<p style="color:red;">${error.message}</p>';
    }
}

function showCountry(country) {
    const languages = Object.values(country.languages || {}).join(", ");

    display.innerHTML = `
    <h2>${country.name.official}</h2>
    <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}" width="200">
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Región:</strong> ${country.region}</p>
    <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Idiomas:</strong> ${languages}</p>
`;
}