import { LitElement, html } from "lit-element";
import "./components/todo-list";

class AppTodoList extends LitElement {
  constructor() {
    super();
    this.tasks = ["Testy jednostkowe", "Implementacja"];
  }

  render() {
    return html`
        <todo-list .items="${this.tasks}"></todo-list>
      `;
  }
}

customElements.define("app-todolist", AppTodoList);
