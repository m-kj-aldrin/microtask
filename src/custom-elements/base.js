const comBaseTemplate = document.createElement("template");
comBaseTemplate.innerHTML = ``;

export class ComBaseElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.append(comBaseTemplate.content.cloneNode(true));
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
