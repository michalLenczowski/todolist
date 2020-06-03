import { LitElement, html, css } from "lit-element";
import "./todo-item";

export class TodoList extends LitElement {
  static get properties() {
    return {
      items: Array
    };
  }

  deleteItem (idx) {
    this.items = this.items.filter((element, index) => index !== idx)
  }

  static get styles() {
    return css`
        .itemsBlock {
            margin-bottom: 20px;
        }
        .btnItem {
            margin-left: 10px;
        }
        `
    }

  sort() {
    this.items.sort((a, b) => {
      return a > b ? 1 : -1
    })
  }

  handleKeyPress(e) {
    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        this.createNewItem()
      }
    }
  }

  handleInput(e) {
    this.task = e.target.value;
  }

  todoItem(task) {
    this.task = task
    return task
  }

  createNewItem() {
    this.items = [...this.items, this.todoItem(this.task)]
    this.task = ''
  }

  render() {
    return html`
      <p>Lista zadań do wykonania:</p>
      ${this.items.map((el, key) =>
          html`
            <todo-item .deleteItem=${this.deleteItem.bind(this, key)} .value=${el}></todo-item>
          `
      )}
      <div class="itemsBlock">
        <input type="text" .value=${this.task} @input=${this.handleInput} @keypress=${this.handleKeyPress} />        
        <button class="ToDo-Add" @click=${this.createNewItem} >Dodaj</button>
      </div>
      <button @click="${this.sort}">Sortuj</button>
    `;
  }
}

customElements.define("todo-list", TodoList)

