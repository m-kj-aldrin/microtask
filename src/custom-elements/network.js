import { ComBaseElement } from "./base.js";

const comNetworkTemplate = document.createElement("template");
comNetworkTemplate.innerHTML = `
<slot></slot>
`;

export class ComNetworkElement extends ComBaseElement {
    get childType(){
        return "chain"
    }
    constructor() {
        super();

        

        // console.log("network constructing: START");

        this.shadowRoot.append(comNetworkTemplate.content.cloneNode(true));

        // console.log("network constructing: END");
    }

    connectedCallback() {
        // console.log("connected network");
        // let chain = this.querySelector("com-chain");
        // console.log("child chain: ", chain?.constructor.name);
    }
    disconnectedCallback() {}
}
