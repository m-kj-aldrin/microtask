const operatorBaseTemplate = document.createElement("template");
operatorBaseTemplate.innerHTML = `
<slot></slot>
`;

export class OperatorBaseElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.append(operatorBaseTemplate.content.cloneNode(true));
    }

    get inputs() {
        return [...this.querySelectorAll("input-number")].map(
            (inp) => inp.value
        );
    }
    set inputs(values) {
        this.querySelectorAll("input-number").forEach((inp, i) => {
            let index = inp.hasAttribute("order")
                ? +inp.getAttribute("order")
                : i;
            inp.value = values[index];
        });
    }

    connectedCallback() {}
    disconnectedCallback() {}
}
