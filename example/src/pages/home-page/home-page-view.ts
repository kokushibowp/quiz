import { View } from "@/core/view";

export class HomePageView extends View<{}> {
  public template(templateProps: {}) {
    return `
      <div>
        <h1>Добро пожаловать в Квиз!</h1>
        <a href="#login">Войти</a>
      </div>
    `;
  }
}
