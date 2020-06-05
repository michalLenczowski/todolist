import { LitElement, html, css } from "lit-element";
import "./todo-item";

export class TodoList extends LitElement {
  static get properties() {
    return {
      items: Array,
      itemsAll: Array,
      test: Object,
      showAlert: Boolean,
      task: {
        value: String,
        done: Boolean
      }
    };
  }

  static get styles() {
    return css`
      .itemsBlock {
        margin-bottom: 5px;
      }
      .btnItem {
        margin-left: 10px;
      }
      .alert {
        color: red;
        font-size: 11px;
      }
      .alertBox {
        margin-bottom: 20px;
      }
    `;
  }

  constructor() {
    super();
    this.itemsAll = this.items
    this.task = {
      value: "",
      done: false
    };
    this.test = { x: "x" };
    this.showAlert = false;
  }

  deleteItem(idx) {
    this.items = this.items.filter((element, index) => index !== idx)
  }

  showAll() {
    this.items = this.itemsAll
  }

  showDone() {
    this.showAll()
    this.items = this.items.filter(element => element.done === true)
  }

  showUnDone() {
    this.showAll()
    this.items = this.items.filter(element => element.done === false)
  }

  sort() {
    this.items.sort((a, b) => {
      return a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
    });
    this.items = [...this.items];
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.createNewItem();
    } else {
      this.task.value = e.target.value;
    }
  }

  handleInput (e) {
    this.task.value = e.target.value;
  }

  changeDone(idx) {
    const item = this.items[idx]
    const itemDone = item.done
    this.items[idx] = {
      value: item.value,
      done: !itemDone
    }
  }

  createNewItem() {
    const value = this.task.value.trim()
    const task = {
      value,
      done: false
    }

    if (task.value) {
      this.items = [...this.items, task]
      this.showAlert = false;
    } else {
      this.showAlert = true;
    }
    
    this.itemsAll = this.items
        
  }

  render() {
    return html`
      <p>Lista zadań do wykonania:</p>
      ${this.items.map(
        (el, key) =>
          html`
            <todo-item
              .key=${key}
              @remove=${({ detail }) => this.deleteItem(detail.key)}
              @change=${({ detail }) => this.changeDone(detail.key)}
              .value=${el}
            ></todo-item>
          `
      )}
      <div class="itemsBlock">
        <input
          type="text"
          .value=${this.task.value}
          @input=${this.handleInput}
          @keypress=${this.handleKeyPress}
        />
        <button class="ToDo-Add" @click=${this.createNewItem}>Dodaj</button>
      </div>
      ${this.showAlert
        ? html`
            <div class="alertBox">
              <span class="alert">Uzupełnij pole</span>
            </div>
          `
        : ""}
      <button @click="${this.sort}">Sortuj</button>
      <button @click="${this.showDone}">Zrobione</button>
      <span></span>
      <button @click="${this.showUnDone}">Niezrobione</button>
      <button @click="${this.showAll}">Wszystkie</button>
    `;
  }
}

if (!customElements.get("todo-list")) {
  customElements.define("todo-list", TodoList);
}
