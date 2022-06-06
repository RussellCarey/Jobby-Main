import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import { Update } from "../../entity/Update";

define(Update, () => {
  const update = new Update();
  update.date = faker.datatype.float({
    min: Math.floor(new Date(Date.now()).getTime() / 1000),
    max: Math.floor(new Date(Date.now()).getTime() / 1000) * 1.1,
    precision: 1,
  });
  update.deleted_at = 0;

  return update;
});
