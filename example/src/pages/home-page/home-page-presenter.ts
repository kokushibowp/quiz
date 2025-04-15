import { Presenter } from "@/core/presenter";
import { HomePageView } from "./home-page-view";

export class HomePagePresenter extends Presenter<HomePageView, void> {
  public init(): void | Promise<void> {
    this.view.init({});
  }
}
