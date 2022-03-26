import BaseComponent from "../common/BaseComponent.js";
import { getChildElement } from "../util/dom.js";

export default class InputComponent extends BaseComponent {
  private _value: string | null = null;
  private handleAddBtn: (newTask: string) => void;

  constructor(appRoot: HTMLElement, handleAddBtn: (newTask: string) => void) {
    super(`<section>
            <h3>User Input</h3>
            <input id="user-input" type="text" />
            <button id="add-btn">Add</button>
          </section>`);

    this.attachTo(appRoot);
    this.handleAddBtn = handleAddBtn;

    this.bindEvent();
  }

  bindEvent() {
    this.bindInput();
    this.bindAddBtn();
  }

  private bindAddBtn() {
    const addBtn = getChildElement<HTMLInputElement>(this.element, "#add-btn");
    addBtn.onclick = () => {
      if (!this._value) return;
      this.handleAddBtn(this._value);
    };
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
}
