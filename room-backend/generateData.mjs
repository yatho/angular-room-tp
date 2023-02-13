import { faker } from '@faker-js/faker';
import * as fs from 'fs';

faker.setLocale('fr');

let database = { rooms : [] };

for (let i=1; i<=200; i++) {
  database.rooms.push({
    id: i,
    capacity: faker.random.numeric(),
    accessibility: faker.datatype.boolean(),
    equipments: [faker.helpers.arrayElement(["TABLE", "VISIO"])],
    address: `${faker.address.streetAddress(true)} ${faker.address.cityName()} ${faker.address.country()}`,
    telephone: faker.phone.number()
  });
}

fs.writeFileSync('./db.json', JSON.stringify(database, null, 4));

console.log(JSON.stringify(database, null, 4));