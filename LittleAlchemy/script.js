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
  "Air+Dust": "Sandstorm",
  "Air+Fire": "Energy",
  "Air+Fog": "Haze",
  "Air+Lava": "Volcanic Ash",
  "Air+Mud": "Swamp",
  "Air+Storm": "Tornado",
  "Air+Water": "Mist",
  "Brick+Air": "Building",
  "Brick+Mud": "Adobe",
  "Cloud+Fire": "Storm",
  "Cloud+Water": "Rainstorm",
  "Dust+Earth": "Dust",
  "Dust+Fire": "Ash",
  "Dust+Steam": "Clay Steam",
  "Dust+Water": "Mud",
  "Earth+Basalt": "Rock",
  "Earth+Brick": "Clay Brick",
  "Earth+Crater": "Mountain",
  "Earth+Fire": "Lava",
  "Earth+Glass": "Glass Block",
  "Earth+Mud": "Clay Brick",
  "Earth+Steam": "Hot Spring",
  "Earth+Water": "Mud",
  "Explosion+Earth": "Crater",
  "Fire+Brick": "Furnace",
  "Fire+Dust": "Ash",
  "Fire+Energy": "Plasma",
  "Fire+Explosion": "Blast",
  "Fire+Lava": "Lava",
  "Fire+Plasma": "Sunlight",
  "Fire+Sandstorm": "Glass Shard",
  "Fire+Steam": "Explosion",
  "Fire+Water": "Steam",
  "Glass+Brick": "Window",
  "Lava+Air": "Stone",
  "Lava+Water": "Obsidian",
  "Mist+Air": "Cloud",
  "Mist+Water": "Rain",
  "Mud+Brick": "Adobe",
  "Mud+Earth": "Clay Brick",
  "Mud+Swamp": "Quagmire",
  "Obsidian+Fire": "Volcano",
  "Plasma+Air": "Electric Cloud",
  "Plasma+Sunlight": "Star",
  "Rainstorm+Earth": "Flood",
  "Steam+Air": "Fog",
  "Steam+Fire": "Explosion",
  "Water+Cloud": "Rainwater",
  "Water+Dust": "Mud",
  "Water+Fog": "Mistcloud",
  "Water+Obsidian": "Basalt",
  "Water+Rainstorm": "Flooded Field"
};