// const network = document.createElement("com-network");

// const chain0 = document.createElement("com-chain");

// const module00 = document
//   .createElement("com-module")
//   .setOperatorType("lfo")
//   .setOperatorParameters([1, 2, 3])
//   .signal("insert");

// const module01 = document
//   .createElement("com-module")
//   .setOperatorType("lfo")
//   .signal("insert");

// document.body.append(network);

// network.append(chain0);

// chain0.append(module00, module01);

// chain0.signal("new");

// setTimeout(() => {
//   console.log("\n");
//   chain0
//     .querySelector("com-module:nth-child(2)")
//     .setOperatorParameters([0, , 0], true);
// }, 1000);

// chain0Modules.forEach((module) => {
//   console.log(module);
//   module.signal("insert");
// });

document.body.innerHTML = `
<com-network>
    <com-chain signal>
      <com-module signal type="lfo" parameters=",,0.1">
      </com-module>
    </com-chain>
</com-network>
`;

// setTimeout(() => {

//     document.body.querySelector("com-chain:nth-child(1)").innerHTML += `
// <com-module type="lfo" parameters="1,2" signal></com-module>
// `
// }, 1000);

// let addMdlBtn = document.createElement("button");
// addMdlBtn.textContent = "add module";
// addMdlBtn.addEventListener("click", (e) => {
//   const newModule = document
//     .createElement("com-module")
//     .setOperatorType("lfo")
//     .setOperatorParameters([500, 1000, 1500])
//     .signal("insert");

//   const firstChain = document.querySelector("com-chain:nth-child(1)");
//   firstChain.appendChild(newModule);
// });

// document.body.append(addMdlBtn);
