export function getChildElement<T extends HTMLElement>(
  parent: HTMLElement,
  selector: string
) {
  return parent.querySelector(selector)! as T;
}
