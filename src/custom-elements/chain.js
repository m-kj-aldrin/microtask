import { ComBaseElement } from "./base.js";

const comChainTemplate = document.createElement("template");
comChainTemplate.innerHTML = `
<div id="header">
    <button data-action="remove">del</button>
</div>
<slot></slot>
`;

export class ComChainElement extends ComBaseElement {
    constructor() {
        super();

        // console.log("chain constructing: START");

        this.shadowRoot.append(comChainTemplate.content.cloneNode(true));

        if (this.hasAttribute("signal")) {
            this.signal("new");
        }

        this.#setupListeners();

        // console.log("chain constructing: END");
    }

    remove(signal = false) {
        signal && this.signal("remove");
        return super.remove();
    }

    #setupListeners() {
        this.shadowRoot.addEventListener("pointerdown", (e) => {
            const action = e.target.getAttribute("data-action");
            switch (action) {
                case "remove":
                    this.remove(true);
                    break;
            }
        });
    }

    #connectedToIntercom = false;
    get isConnectedToIntercom() {
        return this.#connectedToIntercom;
    }

    get parent() {
        return this.closest("com-network");
    }
    get index() {
        return ComBaseElement.indexOf(
            this.parent.querySelectorAll("com-chain"),
            this
        );
    }

    /**@type {"new" | "edit" | "remove"} */
    #deferedSignal = null;

    /**@param {"new" | "edit" | "remove"} type */
    signal(type) {
        if (!this.isConnected) {
            this.#deferedSignal = type;
            return this;
        }

        let signalString = "";

        let cidx = this.index;

        switch (type) {
            case "new":
                if (this.#connectedToIntercom) return this;

                signalString = `chain -n`;
                this.#connectedToIntercom = true;
                break;
            case "edit":
                if (!this.#connectedToIntercom) return this;
                signalString = `chain -e ${cidx}`;
                break;
            case "remove":
                if (!this.#connectedToIntercom) return this;

                signalString = `chain -r ${cidx}`;
                this.#connectedToIntercom = false;
                break;
            default:
                return this;
        }

        console.log(signalString);

        if (!this.#deferedSignal) {
            this.querySelectorAll("com-module").forEach((module) => {
                if (module.latentSignal) {
                    module.signal("insert");
                }
            });
        }

        this.#deferedSignal = null;

        return this;
    }

    connectedCallback() {
        // console.log("chain connected: START");
        if (this.#deferedSignal) {
            this.signal(this.#deferedSignal);
        }
        // console.log("chain connected: END");
    }
    disconnectedCallback() {}
}
