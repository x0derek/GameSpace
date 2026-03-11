let elements = ["Water","Fire","Earth","Air"];
let workspaceItems = [];

const elementsDiv = document.getElementById("elements");
const workspace = document.getElementById("workspace");
const result = document.getElementById("result");
const placeholder = document.getElementById("placeholder");

function normalize(a,b){
 return [a,b].sort().join("+");
}

function combine(a,b){
 let key = normalize(a,b);
 return recipes[key] || null;
}

function renderElements(filter=""){
 elementsDiv.innerHTML="";
 elements
  .filter(e => e.toLowerCase().includes(filter.toLowerCase()))
  .forEach(el => {
   let div = document.createElement("div");
   div.className="element";
   div.textContent=el;
   div.draggable=true;
   div.addEventListener("dragstart", e=>{ e.dataTransfer.setData("text",el); });
   elementsDiv.appendChild(div);
  });
}

workspace.addEventListener("dragover", e=>{ e.preventDefault(); });
workspace.addEventListener("drop", e=>{
 e.preventDefault();
 let element = e.dataTransfer.getData("text");
 addWorkspaceElement(element);
});

function addWorkspaceElement(name){
 placeholder.style.display="none";
 let div=document.createElement("div");
 div.className="workspaceElement";
 div.textContent=name;
 workspace.appendChild(div);
 workspaceItems.push(name);

 if(workspaceItems.length == 2){
    setTimeout(()=>{
      let res = combine(workspaceItems[0], workspaceItems[1]);
      resetWorkspace();

      if(res){
        showResult("You made: " + res);
        if(!elements.includes(res)) elements.push(res);
        renderElements();
      } else {
        showResult("Nothing happened");
      }
    }, 500);
 }
}

function resetWorkspace(){
  workspace.innerHTML = "";
  workspace.appendChild(placeholder);
  placeholder.style.display = "block";
  workspaceItems = [];
}

function showResult(text){
 result.textContent=text;
 result.classList.add("show");
 setTimeout(()=>{ result.classList.remove("show"); },1500);
}

document.getElementById("search").addEventListener("input",e=>{
 renderElements(e.target.value);
});

renderElements();

var recipes = {
  //A
  "Air+Earth": "Dust",
  "Air+Fire": "Energy",
  "Air+Water": "Rain",
  "Air+Air": "Pressure",
  "Fire+Fire": "Heat",
  "Fire+Water": "Steam",
  "Dust+Fire+": "Cinder",
  "Earth+Water": "Mud",
  "Water+Water": "Puddle",
  "Dust+Water": "Clay",
  "Lava+Water": "Obsidian",
  "Dust+Earth": "Dirt",
  "Earth+Fire": "Lava",
  "Earth+Earth": "Land",
  "Earth+Lava": "Volcano",
  "Earth+Pressure": "Stone",
}