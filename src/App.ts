import BaseComponent from "./common/BaseComponent.js";
import InputComponent from "./components/Input.js";
import TodoListComponent from "./components/TodoList.js";
import { makeUniqueId } from "./util/helper.js";

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

    this.InputComponent = new InputComponent(appRoot, this.handleAddBtn);

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
    this.TodoListComponent.setTodoList(nextState);

    this.render();
  };

  handleAddBtn = (newTask: string) => {
    const newTodo: Todo = {
      task: newTask,
      complete: false,
      id: makeUniqueId(),
    };

    const newState = [...this.todoList, newTodo];
    this.setState(newState);
  };
}
