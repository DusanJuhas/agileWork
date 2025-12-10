// Static version without fetch
const TREE = [
  { id:'theory', expanded:false, title:{cs:'Teorie',en:'Theory'}, content:{cs:'content/cs/theory.html',en:'content/en/theory.html'}, children:[
      { id:'scrum', expanded:false, title:{cs:'Scrum',en:'Scrum'}, content:{cs:'content/cs/scrum.html',en:'content/en/scrum.html'}, children:[
          { id:'scrum-roles', expanded:false, title:{cs:'Role ve Scrumu',en:'Scrum Roles'}, content:{cs:'content/cs/scrum-roles.html',en:'content/en/scrum-roles.html'}, children:[
              { id:'product-owner', expanded:false, title:{cs:'Product Owner',en:'Product Owner'}, content:{cs:'content/cs/product-owner.html',en:'content/en/product-owner.html'}, children:[] },
              { id:'scrum-master', expanded:false, title:{cs:'Scrum Master',en:'Scrum Master'}, content:{cs:'content/cs/scrum-master.html',en:'content/en/scrum-master.html'}, children:[] },
              { id:'team', expanded:false, title:{cs:'Tým',en:'Team'}, content:{cs:'content/cs/team.html',en:'content/en/team.html'}, children:[] }
          ]},
          { id:'artifacts', expanded:false, title:{cs:'Artefakty',en:'Artifacts'}, content:{cs:'content/cs/artifacts.html',en:'content/en/artifacts.html'}, children:[] }
      ]},
      { id:'events', expanded:false, title:{cs:'Události',en:'Events'}, content:{cs:'content/cs/events.html',en:'content/en/events.html'}, children:[
        { id:'planning', expanded:false, title:{cs:'Plánování',en:'Planning'}, content:{cs:'content/cs/planning.html',en:'content/en/planning.html'}, children:[] },
        { id:'review', expanded:false, title:{cs:'Review',en:'Review'}, content:{cs:'content/cs/review.html',en:'content/en/review.html'}, children:[] },
        { id:'retrospective', expanded:false, title:{cs:'Retrospektiva',en:'Retrospective'}, content:{cs:'content/cs/retrospective.html',en:'content/en/retrospective.html'}, children:[] }
      ]},
      { id:'kanban', expanded:false, title:{cs:'Kanban',en:'Kanban'}, content:{cs:'content/cs/kanban.html',en:'content/en/kanban.html'}, children:[] }
  ]},
  { id:'practice', expanded:false, title:{cs:'Praxe',en:'Practice'}, content:{cs:'content/cs/practice.html',en:'content/en/practice.html'}, children:[
    { id:'my-experience', expanded:false, title:{cs:'Moje zkušenost',en:'My Experience'}, content:{cs:'content/cs/my-experience.html',en:'content/en/my-experience.html'}, children:[] }
  ]}
];

let currentLang = 'cs';
let selectedNodeId = null;

function setExpandedRecursive(node, value){node.expanded=value;(node.children||[]).forEach(ch=>setExpandedRecursive(ch,value));}
function findNodeById(id,nodes=TREE){for(const n of nodes){if(n.id===id)return n;const f=findNodeById(id,n.children||[]);if(f)return f;}return null;}
function renderTree(){const treeRoot=document.getElementById('tree');treeRoot.innerHTML='';const ul=document.createElement('ul');TREE.forEach(n=>ul.appendChild(renderNode(n,1)));treeRoot.appendChild(ul);}
function renderNode(node,level){const li=document.createElement('li');li.className=`node level-${level}`;const header=document.createElement('div');header.className='node-header';header.setAttribute('role','button');header.setAttribute('aria-expanded',String(!!node.expanded));const toggle=document.createElement('button');toggle.className='toggle'+((node.children&&node.children.length)?'':' hidden');toggle.title=currentLang==='cs'?'Rozbalit/Sbalit':'Expand/Collapse';toggle.textContent=node.expanded?'▾':'▸';toggle.addEventListener('click',(ev)=>{ev.stopPropagation();const ex=!node.expanded;setExpandedRecursive(node,ex);renderTree();});const title=document.createElement('span');title.className='title';title.textContent=node.title[currentLang];header.addEventListener('click',()=>{selectedNodeId=node.id;loadContent(node);document.querySelectorAll('.node-header').forEach(h=>h.classList.remove('selected'));header.classList.add('selected');});header.appendChild(toggle);header.appendChild(title);li.appendChild(header);if(node.children&&node.children.length&&node.expanded){const children=document.createElement('ul');children.className='children';node.children.forEach(ch=>children.appendChild(renderNode(ch,Math.min(4,level+1))));li.appendChild(children);}return li;}
function loadContent(node){const frame=document.getElementById('contentFrame');const path=node.content?node.content[currentLang]:null;if(!path){frame.srcdoc=currentLang==='cs'?'<p class="note">Pro tento uzel není dostupný obsah.</p>':'<p class="note">No content available for this node.</p>';return;}frame.removeAttribute('srcdoc');frame.setAttribute('src',path);}
function setLanguage(lang){currentLang=lang;document.documentElement.lang=(lang==='cs'?'cs':'en');document.querySelectorAll('.lang-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===lang));renderTree();if(selectedNodeId){const node=findNodeById(selectedNodeId);if(node)loadContent(node);}}
window.addEventListener('DOMContentLoaded',()=>{document.getElementById('btn-cs').addEventListener('click',()=>setLanguage('cs'));document.getElementById('btn-en').addEventListener('click',()=>setLanguage('en'));setLanguage('cs');});
