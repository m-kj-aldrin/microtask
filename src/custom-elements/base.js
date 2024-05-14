const comBaseTemplate = document.createElement("template");
comBaseTemplate.innerHTML = ``;

export class ComBaseElement extends HTMLElement {
  get childType() {
    return "";
  }
  get parentType() {
    return "";
  }

  /**@type {ComBaseElement} */
  get parent() {
    return null;
  }
  // get parent() {
  //   // console.log(this.parentType);
  //   // return this.closest(`com-${this.parentType}`);
  // }

  get index() {
    let parent = this.parent;
    // console.log(parent,this);
    if (parent) {
      let siblings = parent.querySelectorAll(`com-${parent.childType}`);
      let i = 0;
      for (const sibling of siblings) {
        if (sibling == this) {
          return i;
        }
        i++;
      }
    }
    return -1;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.append(comBaseTemplate.content.cloneNode(true));
  }

  connectedCallback() {}
  disconnectedCallback() {}
}
