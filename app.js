let favoriteCityId = 'rome';
console.log(favoriteCityId);

favoriteCityId = 'paris';
console.log(favoriteCityId);

const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro'];
console.log(citiesId);

//citiesId = []; lauch TypeError: Assignment to constant variable.

citiesId.push('tokyo');
console.log(citiesId);

function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city, temperature };
}

const weather = getWeather(favoriteCityId);
console.log(weather);

const {
    city: city,
    temperature: temperature
} = weather

console.log(city);
console.log(temperature);

const [parisId, nycId, ...othersCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);

class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice;
    }

    toString() {
        return `Trip [ ${this.id}, ${this.name}, ${this.imageUrl}, ${this._price} ]`
    }

    static getDefaultTrip() { 
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'); 
    }
}

let parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg ');
console.log(parisTrip);
console.log(parisTrip.name);

console.log(parisTrip.toString());

parisTrip._price = 100;
console.log(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());

class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this._price = 0;
    }

    toString() {
        return 'Free' + super.toString();
    }
}

const freeTrip = new FreeTrip('nante', 'Nante', 'img/nantes.jpg');
console.log(freeTrip.toString());

class TripService {
    constructor() {
        this.tripServices = new Set();
        this.tripServices.add(new Trip('paris', 'Paris', 'img/paris.jpg'))
        this.tripServices.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg')) 
        this.tripServices.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'))
    } 
    findByName(tripName) {
        return new Promise((resolve, reject) => { 
            setTimeout(() => {
                let b = false;
                this.tripServices.forEach(e => {
                    if (e.name === tripName) {
                        b = true;
                        resolve(e);
                    }

                    if (!b) {
                        reject(`No trip with name ${tripName}`);
                    }
                });
            }, 2000) 
        }); 
    }
}
class PriceService {
    constructor() {
        this.priceServices = new Map();
        this.priceServices.set('paris', 100);
        this.priceServices.set('rio-de-janeiro', 800);
    } 
    findPriceByTripId(tripId) { 
        return new Promise((resolve, reject) => { 
            setTimeout(() => { 
                if (this.priceServices.has(tripId)) {
                    resolve(this.priceServices.get(tripId));
                } else {
                    reject(`No price found for id ${tripId}`);
                }
            }, 2000) 
        }); 
    }
}

const tripSrv = new TripService();
const priceSrv = new PriceService();

tripSrv.findByName('Paris')
    .then(resolve => console.log(resolve.toString()))
    .catch(reject => console.log(reject));

priceSrv.findPriceByTripId('paris')
    .then(resolve => console.log(resolve))
    .catch(reject => console.log(reject));