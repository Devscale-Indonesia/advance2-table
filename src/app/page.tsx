import { IUser, Table } from "@/components/table";
import { faker } from "@faker-js/faker";

function createDummyData() {
  const data: IUser[] = [];
  for (let i = 0; i < 30; i++) {
    data.push({ name: faker.person.fullName(), email: faker.internet.email() });
  }

  return data;
}

export default function Home() {
  const dummyData = createDummyData();

  return <Table initialData={dummyData} />;
}
