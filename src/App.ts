import BaseComponent from "./common/BaseComponent.js";
import InputComponent from "./components/Input.js";
import TodoListComponent from "./components/TodoList.js";

export default class App extends BaseComponent {
  private todoList: Todo[];
  private TodoListComponent: TodoListComponent;
  private InputComponent: InputComponent;

  constructor(appRoot: HTMLElement) {
    super(`<section>
            <h1>Todo List</h1>
          </section>`);

    this.todoList = [];
    this.attachTo(appRoot, "beforeend");

    this.InputComponent = new InputComponent(
      appRoot,
      this.todoList,
      this.setState
    );
    this.TodoListComponent = new TodoListComponent(
      appRoot,
      this.todoList,
      this.setState
    );
    this.render();
  }

  render() {
    this.InputComponent;
    this.TodoListComponent.render();
  }

  setState = (nextState: Todo[]) => {
    this.todoList = nextState;

    this.InputComponent.setTodoList(nextState);
    this.TodoListComponent.setTodoList(nextState);

    this.render();
  };
}
