import BaseComponent from "../common/BaseComponent.js";
import { getChildElement } from "../util/dom.js";

function makeUniqueId() {
  return String(
    parseInt(String(new Date().getMilliseconds() * Math.random() * 1000000), 10)
  );
}

export default class InputComponent extends BaseComponent {
  private _value: string | null = null;

  private todoList: Todo[];
  private setState: SetState;

  constructor(appRoot: HTMLElement, initTodoData: Todo[], setState: SetState) {
    super(`<section>
            <h3>User Input</h3>
            <input id="user-input" type="text" />
            <button id="add-btn">Add</button>
          </section>`);

    this.todoList = initTodoData;
    this.setState = setState;

    this.attachTo(appRoot);
    this.bindEvent();
  }

  bindEvent() {
    this.bindInput();
    this.bindAddBtn();
  }

  private bindAddBtn() {
    const addBtn = getChildElement<HTMLInputElement>(this.element, "#add-btn");
    addBtn.onclick = this.handleClick;
  }

  private bindInput() {
    const userInputDom = getChildElement<HTMLInputElement>(
      this.element,
      "#user-input"
    );
    userInputDom.onkeyup = this.handleChange;
  }

  private handleChange = (e: Event) => {
    this._value = (e.target as HTMLInputElement).value;
  };

  private handleClick = () => {
    if (!this._value) return;

    const newTodo: Todo = {
      task: this._value,
      complete: false,
      id: makeUniqueId(),
    };
    this.setState([...this.todoList, newTodo]);
  };

  setTodoList(newState: Todo[]) {
    this.todoList = newState;
  }
}
