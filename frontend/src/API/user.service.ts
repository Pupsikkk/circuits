import axios from "axios";

export class UserService {
  static async register({ email, password, name, lastname }: any) {
    const {
      data: { profile, token },
    } = await axios.post("http://localhost:3000/user/register", {
      email,
      password,
      firstName: name,
      lastName: lastname,
    });

    return {
      profile,
      token,
    };
  }

  static async login({ email, password }: any) {
    const { data: token } = await axios.post(
      "http://localhost:3000/user/login",
      {
        password,
        email,
      }
    );

    return token;
  }

  static async getProfile(token: string) {
    const fetchedProfile = await axios.get(
      `http://localhost:3000/user/profile?access_token=${token}`
    );

    return fetchedProfile.data;
  }

  static async updateProfile(
    token: string,
    data: {
      email?: string;
      firstName?: string;
      lastName?: string;
      avatar?: string;
      description?: string;
      city?: string;
      country?: string;
      phone?: string;
    }
  ) {
    if (!token) return;

    const response = await axios.put(
      `http://localhost:3000/user/update?access_token=${token}`,
      data
    );

    return response.data;
  }
}
