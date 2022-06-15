import './css/styles.css';
import debounce from 'lodash.debounce'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))

function onInputChange(e) {
    const countryToFind = e.target.value.trim();
    if (countryToFind === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }
        fetchCountries(countryToFind)
            .then(countries => {
                refs.countryList.innerHTML = '';
                refs.countryInfo.innerHTML = '';
                if (countries.length > 10) {
                    tooManyMatches();
                    return;
                    
                }
                if (countries.length === 1) {
                    refs.countryList.insertAdjacentHTML('beforeend', createCountryListMarkup(countries))
                    refs.countryInfo.insertAdjacentHTML('beforeend', createCountryInfoMarkup(countries))
                } else { 
                    refs.countryList.insertAdjacentHTML('beforeend', createCountryListMarkup(countries))
                }
            })
            .catch(failureInput)
    
}

function createCountryListMarkup(countries) { 
     return countries.map(({ flags, name }) => { 
        return `<li class="country-list__item"> <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2></li>`
    }).join('');
}

function createCountryInfoMarkup(country) {
    return country.map(({ capital, population, languages, name }) => { 
        return `
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>`
    }).join('');
 }
 
function failureInput() { 
    Notify.failure('Oops, there is no country with that name')
}

function tooManyMatches() { 
    Notify.success('Too many matches found. Please enter a more specific name.')
}


