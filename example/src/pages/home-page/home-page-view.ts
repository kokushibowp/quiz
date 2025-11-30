import { View } from "@/core/view";

export class HomePageView extends View<{}> {
  public template(templateProps: {}) {
    return `
      <div class = "body">
        <div class = "body-left">
        </div>
        <div class = "body-right">
          <h1>Добро пожаловать в Квиз!</h1>
          <a href="#login">Войти</a>
        </div>
      </div>
    `;
  }
}
