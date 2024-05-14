const network = document.createElement("com-network");

const chain0 = document.createElement("com-chain")
chain0.signal("new")

const module00 = document
  .createElement("com-module")
  .setOperatorType("lfo")
  .setOperatorParameters([1, 2, 3])
  .signal("insert");

const module01 = document
  .createElement("com-module")
  .setOperatorType("lfo")
  .signal("insert");

chain0.append(module00, module01);

network.append(chain0);

document.body.append(network);




// let chain0Modules = document.querySelectorAll(
//   `com-chain:nth-child(${1}) com-module`
// );

// chain0Modules.forEach((module) => {
//   console.log(module);
//   module.signal("insert");
// });

// document.body.innerHTML = `
// <com-network>
//     <com-chain signal>
//         <com-module type="lfo" parameters="100,200,300" signal>
//         </com-module>
//     </com-chain>
// </com-network>
// `;

// setTimeout(() => {

//     document.body.querySelector("com-chain:nth-child(1)").innerHTML += `
// <com-module type="lfo" parameters="1,2" signal></com-module>
// `
// }, 1000);

let addMdlBtn = document.createElement("button");
addMdlBtn.textContent = "add module";
addMdlBtn.addEventListener("click", (e) => {
  const newModule = document
    .createElement("com-module")
    .setOperatorType("lfo")
    .setOperatorParameters([500, 1000, 1500])
    .signal("insert");

  const firstChain = document.querySelector("com-chain:nth-child(1)");
  firstChain.appendChild(newModule);

});

document.body.append(addMdlBtn);
