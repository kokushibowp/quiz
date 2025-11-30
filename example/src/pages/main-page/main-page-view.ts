import { TargetElementType, View } from "@/core/view";

export interface MainPageViewProps {
    //errorMessage: string;
}

export class MainPageView extends View<MainPageViewProps> {

    private divGrid: any;

    constructor(
        protected readonly targetElement: TargetElementType,
        protected readonly replace = false
    ) {
        super(targetElement, replace);
    }

    template({ }: MainPageViewProps) {
        return `
        <div>
            <header>
                <div class="left">
                    <a>QuizMaster</a>
                    <div class="links">
                        <a>Узнать больше</a>
                        <a>Поддержка</a>
                    </div>
                </div>
                <div class="right">
                    <button>
                        <img src="../../img/user.png">
                        Username
                    </button>
                    <div class="right-exit">
                        <button>Выйти</button>
                    </div>
                    
                </div>
            </header>
            <section id="section">
                
            </section>
            <footer>
                <div class="left">
                    <a>QuizMaster</a>
                </div>
                <div class="right">
                    <a>Контакты</a>
                    <a>Конфиденциальность</a>
                    <a>Политика сайта</a>
                </div>
            </footer>
        </div>
        `;
    }


    showQuizList() {
        let elem = document.getElementById("section");
        if (elem)
            elem.innerHTML = `
                <h1>Лучшие онлайн-тесты этой недели</h1>
                <div class="grid" id="grid">
                </div>
            `;
    }

    showQuiz() {
        let elem = document.getElementById("section");
        if (elem)
            elem.innerHTML = `
                <div class = "quiz-wrap">
                    <div class = "quiz">
                        <div class = "question-header">
                            <h2>Question</h2>                    
                            <fieldset>
                                <div>
                                    <label for="answer1">
                                        <input type="radio" id="answer1" name="answer">
                                        answer1
                                    </label>
                                </div>
                                <div>
                                    <label for="answer2">
                                        <input type="radio" id="answer2" name="answer">
                                        answer2
                                    </label>
                                </div>
                                <div>
                                    
                                    <label for="answer3">
                                        <input type="radio" id="answer3" name="answer">
                                        answer3
                                    </label>
                                </div>
                                <div>
                                    <label for="answer4">
                                        <input type="radio" id="answer4" name="answer">
                                        answer4
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                        <div class = "question-bottom">
                            <p>Вопрос 1/10</p>
                            <div>
                                <button disabled>Далее</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }

    showQuizImg() {
        let elem = document.getElementById("section");
        if (elem)
            elem.innerHTML = `
                <div class = "quiz-wrap">
                    <div class = "quiz-img">
                        <div class = "question-header">
                            <img src="http://localhost:3000/preview_movies.webp">
                            <h2>Question</h2>                 
                            <fieldset>
                                <div>
                                    <label for="answer1">
                                        <input type="radio" id="answer1" name="answer">
                                        answer1
                                    </label>
                                </div>
                                <div>
                                    <label for="answer2">
                                        <input type="radio" id="answer2" name="answer">
                                        answer2
                                    </label>
                                </div>
                                <div>
                                    
                                    <label for="answer3">
                                        <input type="radio" id="answer3" name="answer">
                                        answer3
                                    </label>
                                </div>
                                <div>
                                    <label for="answer4">
                                        <input type="radio" id="answer4" name="answer">
                                        answer4
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                        <div class = "question-bottom">
                            <p>Вопрос 1/10</p>
                            <div>
                                <button disabled>Далее</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }

    clear() {
        let elem = document.getElementById("section");
        if (elem)
            elem.innerHTML = "";
    }

    public async renderQuiz(quiz: any) {
        let img = new Image();
        img.src = quiz.preview;
        let relationship = img.width / img.height;
        this.divGrid = document.getElementById("grid");
        const newElement = document.createElement("div");
        if (relationship > 1.5)
            newElement.className = "div_wide";
        else
            newElement.className = "div_narrow";
        newElement.style.backgroundImage = `url(${quiz.preview})`;
        newElement.innerHTML = `
        <div>
            <div>
                <p class = "description">${quiz.description}</p>
                <div>
                    <p>QuizMaster</p>
                    <div>
                        <img src = "../../img/eye.png">
                        <p>123</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        if (this.divGrid)
            this.divGrid.prepend(newElement);

        newElement.addEventListener("click", () => {
            console.log(quiz.id);
            this.clear();
            this.showQuizImg();
        });
    }

    public override bindListeners(): void { }
}