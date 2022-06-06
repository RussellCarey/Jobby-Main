import { faker } from "@faker-js/faker";
import { define } from "typeorm-seeding";
import { Comment } from "../../entity/Comment";

define(Comment, () => {
  const comment = new Comment();
  comment.comment = faker.random.words(15);
  comment.created_at = faker.datatype.float({
    min: Math.floor(new Date(Date.now()).getTime() / 1000),
    max: Math.floor(new Date(Date.now()).getTime() / 1000) * 1.1,
    precision: 1,
  });
  comment.deleted_at = 0;
  return comment;
});
