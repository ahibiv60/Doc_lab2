const faker = require('faker');
const ObjectsToCsv = require('objects-to-csv');

const tariffData = [];
const mobileData = [];
const customerData = [];

const tariffs = ['SupernetStart', 'SupernetTurbo', 'SupernetUnlim', 'SuperStart', 'SuperTurbo', 'SuperUnlim'];
const tariffsPrice = ['100', '150', '200', '150', '200', '250']

const mobiles = ['mi 11 lite', 'mi 10 lite', 'mi 11', 'mi 10', 'redmi note 10', 'redmi note 9'];
const mobilesPrice = ['10000', '8000', '25000', '20000', '15000', '14000'];

const getRandomTariffName = () => {
    const tariffs = ['SupernetTurbo', 'SupernetStart', 'SupernetUnlim', 'SuperUnlim', 'SuperStart', 'SuperTurbo'];
    const tariffIndex = Math.floor(Math.random() * 6);
    return tariffs[tariffIndex];
};

for (let i = 0; i < 6; i++) {
    tariffData.push({
        name: tariffs[i],
        price: tariffsPrice[i]
    });
}

for (let i = 0; i < 6; i++) {
    mobileData.push({
        name: mobiles[i],
        price: mobilesPrice[i]
    });
}

for (let i = 0; i < 299; i++) {
    customerData.push({
        name: faker.name.findName(),
        phone: "+380" + Math.floor(Math.random() * Math.floor(100000000)),
        activeTariff: getRandomTariffName()
    });
}

const tariffDataCSV = new ObjectsToCsv(tariffData);
const mobileDataCSV = new ObjectsToCsv(mobileData);
const customerDataCSV = new ObjectsToCsv(customerData);

tariffDataCSV.toDisk('./source/data/tariffData.csv');
mobileDataCSV.toDisk('./source/data/mobileData.csv');
customerDataCSV.toDisk('./source/data/customerData.csv');
