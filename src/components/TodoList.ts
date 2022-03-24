import BaseComponent from "../common/BaseComponent.js";
import { getChildElement } from "../util/dom.js";

export default class TodoListComponent
  extends BaseComponent
  implements Component
{
  private todoList: Todo[];
  public setState: SetState;

  constructor(appRoot: HTMLElement, initTodoData: Todo[], setState: SetState) {
    super(`<section>
            <h3>List View</h3>
            <ul class="todo-list"></ul>
          </section>`);

    this.todoList = initTodoData;
    this.attachTo(appRoot);

    this.setState = setState;
  }

  render() {
    const todoView = getChildElement<HTMLUListElement>(
      this.element,
      ".todo-list"
    );

    todoView.innerHTML = "";

    const todoItems = this.todoList.map(this.bindTodoItemEvent);
    todoItems.forEach((todoItem) =>
      todoView.insertAdjacentElement("beforeend", todoItem)
    );
  }

  private bindTodoItemEvent = ({ id, task, complete }: Todo): HTMLElement => {
    const todoItemTemplate = document.createElement("template");

    todoItemTemplate.innerHTML = `<div class="todo-item" data-todo-id=${id}>
          <input type="checkbox" check=${complete}>${task}<span class="del-btn">❌</span>
        </div>`;

    const todoItem = todoItemTemplate.content.firstElementChild! as HTMLElement;
    this.bindDeleteBtn(todoItem);
    // this.bindEditBtn(todoItem);

    return todoItem;
  };

  private bindDeleteBtn(todoItem: HTMLElement) {
    const delBtn = getChildElement<HTMLElement>(todoItem, ".del-btn");

    delBtn.onclick = () => {
      const todoId: string = todoItem.dataset["todoId"]!;

      const newState: Todo[] = this.todoList.filter(({ id }) => id !== todoId);
      this.setState(newState);
    };
  }

  // private bindEditBtn(todoItem: HTMLElement) {
  //   const delBtn = getChildElement<HTMLElement>(todoItem, ".del-btn");

  //   delBtn.onclick = () => {
  //     console.log(e.target, todoItem.dataset["todoId"]);
  //   };
  // }

  setTodoList(newState: Todo[]) {
    this.todoList = newState;
  }
}
