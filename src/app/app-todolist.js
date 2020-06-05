import { LitElement, html } from "lit-element";
import "./components/todo-list";

class AppTodoList extends LitElement {
  constructor() {
    super();
    this.tasks = [{ value: "Testy jednostkowe", done: false }, { value: "Implementacja", done: false }];
  }

  render() {
    return html`
        <todo-list .items="${this.tasks}" .itemsAll="${this.tasks}"></todo-list>
      `;
  }
}

customElements.define("app-todolist", AppTodoList);
