const baseurl = 'http://localhost:3000/api';

export class MainModel {
  async getQuizzes(token: any) {
    let response = await fetch(`${baseurl}/quizzes`, {
      method: "GET",
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const quizzes = await response.json();
    return quizzes;
  }
}