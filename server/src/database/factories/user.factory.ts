import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { User } from '../../entity/User';
import * as AuthServices from '../../controller/services/authServices';
import { v4 as uuidv4 } from 'uuid';

define(User, () => {
	const user = new User();
	user.firstName = faker.name.firstName();
	user.lastName = faker.name.lastName();
	user.username = `${faker.random.word()}${faker.random.word()}`;
	user.email = faker.internet.email();
	user.password = AuthServices.bcryptPasswordSync('12345678');
	user.is_verified = faker.datatype.boolean();
	user.verification_token = !user.is_verified ? uuidv4() : '';
	user.deleted_at = 0;
	user.dob = faker.datatype.float({ precision: 1 });
	user.image = '';
	user.thumbnail = '';
	return user;
});
