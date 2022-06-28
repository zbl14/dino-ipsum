export default class DinoRequest {
  static async getDino(){
    try {
      const response = await fetch(`https://dinoipsum.com/api/?format=json&words=1&paragraphs=1`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}