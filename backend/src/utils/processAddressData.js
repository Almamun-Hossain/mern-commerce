//imports the required npm packages and module
const Country = require("country-state-city").Country;
const State = require("country-state-city").State;
const City = require("country-state-city").City;

/**
 * This function is to responsible to process form data
 * actually when going to work with country-state-city package
 * face some issue. which is when going to find states cities
 * the function required country isoCode and sateCode.
 * If we just store the country and state's name it's become tough
 * to find country data, country states, and cities
 *
 * For that we can write extra methods or function
 * but my goal is not to do that and make use of package method
 *
 * So going to store country data as object with isoCode and name
 * also same as state.
 */

exports.processFormData = (data) => {
  let countryData,
    stateData,
    cityData,
    city = null;
  //check we have valid data
  if (data) {
    if (data.country) {
      //find the country data
      countryData = Country.getCountryByCode(data.country);
    }

    if (data.state) {
      //find the state data
      stateData = State.getStateByCodeAndCountry(data.state, data.country);

    }

    if (data.city) {
      //its returning all cities of a state. but we need a single city information
      cityData = City.getCitiesOfState(data.country, data.state);

      //so find the single city details using the data.city name
      city = cityData.find((c) => c.name === data.city);
    }
    //update the data
    if (countryData) {
      data.country = { ...countryData };
    } else {
      data.country = null;
    }
    if (stateData) {
      data.state = { ...stateData };
    } else {
      data.state = null;
    }

    if (cityData && city) {
      data.city = { ...city };
    } else {
      data.city = null;
    }

    //finally return the processed data
    return data;
  }
};

//module.exports = { processFormData };
