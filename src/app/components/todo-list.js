import { LitElement, html, css } from "lit-element";
import "./todo-item";

export class TodoList extends LitElement {
  static get properties() {
    return {
      items: Array
    };
  }

  constructor () {
    super()
    this.task = ''
  }

  deleteItem (idx) {
    this.items = this.items.filter((element, index) => index !== idx)
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
        `
    }

  sort() {
    this.items.sort((a, b) => {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1
    })
    this.items = [...this.items]
  }

  handleKeyPress(e) {
    if (e.target.value !== '') {
      if (e.keyCode === 13) {
        this.createNewItem()
      }
    }
  }

  handleInput (e) {
    this.task = e.target.value;
  }

  clearInput () {
    this.shadowRoot.querySelector('input').value = ""
  }

  showAlert (task) {
    this.shadowRoot.querySelector('.alert').innerHTML = "Wprowadź poprawnę nazwę"
  }

  todoItem (task) {
    this.task = task
    return task
  }

  createNewItem () {
    if (this.task) {      
      this.items = [...this.items, this.todoItem(this.task)]
      this.task = ''    
      this.clearInput()
      this.shadowRoot.querySelector('.alert').innerHTML = ""
    } else {
      this.showAlert()
    }
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
      <div class="alertBox">  
        <span class="alert"></span>
      </div>  
      <button @click="${this.sort}">Sortuj</button>
    `;
  }
}

customElements.define("todo-list", TodoList)

