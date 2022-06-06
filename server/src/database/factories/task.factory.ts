import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import { Task } from "../../entity/Task";

define(Task, () => {
  const task = new Task();
  task.title = faker.random.words(5);
  task.description = faker.random.words(50);
  task.type = +faker.datatype.float({ min: 0, max: 2, precision: 1 });
  task.time_logged = +faker.datatype.float({ min: 0, max: 10, precision: 1 });
  task.time_remaining = +faker.datatype.float({ min: 0, max: 5, precision: 1 });
  task.priority = +faker.datatype.float({ min: 0, max: 2, precision: 1 });
  task.created_at = +faker.datatype.float({
    min: Math.floor(new Date(Date.now()).getTime() / 1000),
    max: Math.floor(new Date(Date.now()).getTime() / 1000) * 1.1,
    precision: 1,
  });
  task.deleted_at = 0;
  return task;
});
