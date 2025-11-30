import { Presenter } from "@/core/presenter";
import { MainPageView } from "./main-page-view";
import { MainModel } from "@/models/main-model";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoidXNlckBtYWlsLnJ1IiwiaWF0IjoxNzQ2MDU0MzU5LCJleHAiOjE3NDg2NDYzNTl9.Lv6y8iUWIcSLZ3Uio_9Mdjkq-UbpkDQTZb_cAAfY988";

export class MainPagePresenter extends Presenter<MainPageView, MainModel> {
  public init() {
    this.view.init({});
    this.view.showQuizList();
    let quizzes = this.model.getQuizzes(token);
    quizzes.then((quizzes) => {
      //console.log(quizzes[2])
      let length = quizzes.length;
      for (let i = 0; i < length; ++i) {
        this.view.renderQuiz(quizzes[i]);
      }
    });
  }
}