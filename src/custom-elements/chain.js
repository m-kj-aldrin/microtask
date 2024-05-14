import { ComBaseElement } from "./base.js";

const comChainTemplate = document.createElement("template");
comChainTemplate.innerHTML = `
<slot></slot>
`;

export class ComChainElement extends ComBaseElement {
  get childType() {
    return "module";
  }

  get parent() {
    return this.closest("com-network");
  }

  constructor() {
    super();

    // console.log("chain constructing: START");

    this.shadowRoot.append(comChainTemplate.content.cloneNode(true));

    if (this.hasAttribute("signal")) {
      this.signal("new");
    }

    // console.log("chain constructing: END");
  }

  #connectedToIntercom = false;
  get isConnectedToIntercom() {
    return this.#connectedToIntercom;
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

    switch (type) {
      case "new":
        if (this.#connectedToIntercom) return this;

        signalString = `chain -n`;
        this.#connectedToIntercom = true;
        break;
      case "edit":
        if (!this.#connectedToIntercom) return this;
        signalString = `chain -e ${0}`;
        break;
      case "remove":
        if (!this.#connectedToIntercom) return this;

        signalString = `chain -r ${0}`;
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
