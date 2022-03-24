export default class BaseComponent implements Component {
  protected element: HTMLElement;

  constructor(htmlString: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlString;

    this.element = template.content.firstElementChild! as HTMLElement;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "beforeend") {
    parent.insertAdjacentElement(position, this.element);
  }
}
