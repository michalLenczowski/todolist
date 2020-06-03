import { LitElement, html, css } from "lit-element";

export class TodoItem extends LitElement {
  static get properties() {
    return {
      value:  String,
      deleteItem: Function
    };
  }

  static get styles() {
    return css`
        .itemBlock {
            margin-bottom: 20px;
        }
        .btnItem {
            margin-left: 10px;
        }
        `
    }

  render() {
    return html`
     <div class="itemBlock">
        <span>${this.value}</span>
        <button class="btnItem" @click="${this.deleteItem}">Usuń</button>
     </div>`;
  }
}
customElements.define("todo-item", TodoItem);
