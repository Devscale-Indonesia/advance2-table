import { Table } from "@/components/table";
import { IUser } from "@/types/user";
import { faker } from "@faker-js/faker";

function createDummyData() {
  const data: IUser[] = [];
  for (let i = 0; i < 40; i++) {
    const newUser: IUser = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      website: faker.internet.domainName(),
      subRows: (() => {
        const numSubRows = Math.floor(Math.random() * 8) + 1;
        const subRows = [];
        for (let j = 0; j < numSubRows; j++) {
          subRows.push({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            phone: faker.phone.number(),
            website: faker.internet.domainName(),
          });
        }
        return subRows;
      })(),
    };
    data.push(newUser);
  }

  return data;
}

export default function Home() {
  const dummyData = createDummyData();

  return <Table initialData={dummyData} />;
}
