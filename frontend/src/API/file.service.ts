import axios from "axios";

export class FileService {
  static async uploadImage(formData: FormData) {
    const response = await axios.post(
      "http://localhost:3000/files/upload",
      formData
    );

    return "http://localhost:3000/uploads/" + response.data.filename;
  }
}
