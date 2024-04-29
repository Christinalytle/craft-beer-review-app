import { LightningElement } from 'lwc';

export default class BeerCompanyLWC extends LightningElement {
    city;
    get city() {
        return this.city;
    }
    set city(value) {
        this.city = value;
    }
  
    breweries = [];
    get breweries() {
        return this.breweries;
    }
    set breweries(value) {
        this.breweries = value;
    }
   
    error;
    get error() {
        return this.error;
    }
    set error(value) {
        this.error = value;
    }

    handleInputChange(event) {
        this.city = event.target.value;
    }

    handleSearch() {
        if (!this.city.trim()) {
            this.error = 'Please enter a city name.';
            return;
        }

        this.error = '';

        fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${this.city}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.breweries = data;
            })
            .catch(error => {
                this.error = 'Error fetching breweries: ' + error.message;
            });
    }

}