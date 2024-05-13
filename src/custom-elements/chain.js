import { ComBaseElement } from "./base.js";

const comChainTemplate = document.createElement("template");
comChainTemplate.innerHTML = `
<slot></slot>
`;

export class ComChainElement extends ComBaseElement {
    constructor() {
        super();

        // console.log("chain constructing: START");

        this.shadowRoot.append(comChainTemplate.content.cloneNode(true));

        // console.log("chain constructing: END");
    }

    connectedCallback() {
        // console.log("connected chain");
        // const module = this.querySelector("com-module");
        // console.log("child module: ", module?.constructor.name);
    }
    disconnectedCallback() {}
}
