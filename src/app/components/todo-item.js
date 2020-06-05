import { LitElement, html, css } from "lit-element";

export class TodoItem extends LitElement {
  static get properties() {
    return {
      key: Number,
      value: Object,
      deleteItem: Function,
      setDoneTask: Function
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
      .completed {
        text-decoration: line-through;
      }
    `;
  }

  deleteItem() {
    this.dispatchEvent(
      new CustomEvent("remove", {
        bubbles: true,
        composed: true,
        detail: { key: this.key }
      })
    );
  }

  changeDone() {
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: { key: this.key }
      })
    );
  }

  render() {
    return html`
      <div class="itemBlock">
        <input type="checkbox" value=${this.value.done} @click=${this.changeDone}>
        ${this.value.done ? html`
          <span class="completed">${this.value.value}</span>` :
          html`
          <span>${this.value.value}</span>`}
      </div>
    `;
  }
}
customElements.define("todo-item", TodoItem);
