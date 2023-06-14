import { ModelStatic } from 'sequelize';
import { compareSync } from 'bcryptjs';
import UserModel from '../models/UsersModel';
import generateToken from '../utils/JWT';

class UserService {
  protected model: ModelStatic<UserModel> = UserModel;

  login = async (email: string, password: string) => {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return { type: 401, message: 'Invalid email or password' };

    const validPass = compareSync(password, user.password);

    if (validPass) {
      return {
        token: generateToken({
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        }),
      };
    }

    return { type: 401, message: 'Invalid email or password' };
  };
}

export default UserService;
