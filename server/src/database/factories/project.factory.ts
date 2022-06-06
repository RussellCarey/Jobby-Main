import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import { Project } from "../../entity/Project";

define(Project, () => {
  const project = new Project();
  project.name = faker.random.words(4);
  project.description = faker.random.words(50);
  project.created_at = faker.datatype.float({
    min: Math.floor(new Date(Date.now()).getTime() / 1000),
    max: Math.floor(new Date(Date.now()).getTime() / 1000) * 1.1,
    precision: 1,
  });

  return project;
});
