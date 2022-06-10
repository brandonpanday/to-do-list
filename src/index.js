import "./css/reset.css";
import "./css/fonts.css";
import "./css/style.css";
import TrashIcon from "./assets/trash-can.png";
import AddProjectIcon from "./assets/addToInbox.png";
import TrashBlue from "./assets/trash-blue.png";
import { ProjectFactory, Controller, addNoteToProject, deleteNote } from './print.js';

const container = () => {
  let container = document.createElement('div');
  container.classList.add('container');
  container.append(
    loadHeader(), 
    loadMain()
    );
  return container;
}

const isProjectAvail = (name) => {
  let i = true;
  Controller.projectArray.forEach(p => {
    if (name == p.getName()) {
      i = false;
    }
  })
  return i;
}

const loadHeader = () => {
  let headerContainer = document.createElement('section');
  headerContainer.classList.add('header-container');
  let header = document.createElement("header");
  header.classList.add("header");
  let logo = document.createElement('div');
  logo.classList.add('logo');
  let title = document.createElement('h3');
  title.innerText = "Do!t.app";
  let subtitle = document.createElement('p');
  subtitle.innerText = "Created by Brandon P.";
  header.append(logo, title, subtitle);
  let nav = document.createElement('nav');
  nav.classList.add('nav');

  let analyticsHeader = document.createElement('h3');
  analyticsHeader.textContent = "Analytics";
  analyticsHeader.classList.add('navigation-header');
  let analyticsBtn = document.createElement('span');
  analyticsBtn.classList.add('category');
  analyticsBtn.textContent = "Dashboard";
  analyticsBtn.addEventListener('click', e => {
    let addBar = document.querySelector('.add-container');
    let taskCnt = document.querySelector('.task-container');
    let activeProj = document.querySelector('.active-project');
    activeProj.textContent = analyticsBtn.textContent;
    taskCnt.replaceChildren();
    addBar.style.display = 'none';
  })

  let projectHeaderContainer = document.createElement('div');
  projectHeaderContainer.classList.add('project-header-container');
  let projectsHeader = document.createElement('h3');
  projectsHeader.classList.add("projects-header");
  projectsHeader.textContent = "Projects";
  projectHeaderContainer.append(projectsHeader);

  let newProjContainer = document.createElement('div');
  newProjContainer.classList.add("new-proj-container");
  let projectInput = document.createElement('input');
  projectInput.placeholder = "Enter new project name";
  const addToInbox = new Image();
  addToInbox.src = AddProjectIcon;
  addToInbox.classList.add('add-to-inbox');
  addToInbox.title = "Add new project";
  addToInbox.addEventListener("click", e=> {
    if (isProjectAvail(projectInput.value) == true) {
      let newProj = ProjectFactory(projectInput.value);
      Controller.addProject(newProj);
      projectInput.value = "";
      addProjectsToDom();
      console.log(Controller.projectArray);
    } else {
      alert("Project name is taken");
    }
  })
  newProjContainer.append(projectInput, addToInbox);
  let projectsNav = document.createElement('div');
  projectsNav.classList.add('projects-nav');
  nav.append(analyticsHeader, analyticsBtn, projectHeaderContainer, newProjContainer, projectsNav);

  headerContainer.append(header, nav);
  return headerContainer;
};

const loadMain = () => {
  let main = document.createElement('main');
  let infoBar = document.createElement('div');
  infoBar.classList.add('info-bar');
  
  let projectPath = document.createElement('div');
  let dotDotSlash = document.createElement('span');
  dotDotSlash.classList.add('active-logo');
  dotDotSlash.innerText = "../";
  let activeProject = document.createElement('span');
  activeProject.innerText = "Dashboard";
  activeProject.classList.add('active-project');
  projectPath.append(dotDotSlash, activeProject);

  infoBar.append(projectPath);

  let taskContainer = document.createElement('section');
  taskContainer.classList.add('task-container');
  
  let addContainer = document.createElement('div');
  addContainer.classList.add('add-container');
  let newInput = document.createElement('input');
  newInput.placeholder = "Enter new task";
  let addControls = document.createElement('div');
  addControls.classList.add('add-controls');
  let addBtn = document.createElement('button');
  addBtn.innerText = "+";
  addBtn.classList.add('add-btn');
  addBtn.addEventListener('click', e=> {
    let noteInput = newInput.value;
    console.log(noteInput);
    Controller.projectArray.forEach(p => {
      if (activeProject.innerText == p.getName()) {
        p.addNote(noteInput);
        loadProjectNotes(p);
        newInput.value = "";
      }
    })
  })
  let cancelBtn = document.createElement('button');
  cancelBtn.addEventListener("click", e=> {
    newInput.value = "";
  })
  cancelBtn.innerText = "x";
  addControls.append(cancelBtn, addBtn);
  addContainer.append(newInput, addControls);

  main.append(infoBar, taskContainer, addContainer);
  return main;
}
const loadProjectNotes = (proj) => {
  let taskContainer = document.querySelector('.task-container');
  taskContainer.replaceChildren();
  proj.noteArray.forEach(note => {
    let noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');
    let noteText = document.createElement('p');
    noteText.innerText = note;
    const trashIcon = new Image();
    trashIcon.classList.add('trash-can-icon');
    trashIcon.src = TrashIcon;
    trashIcon.addEventListener ("click", e => {
      let activeProject = document.querySelector('.active-project').innerText;
      let noteContent = e.explicitOriginalTarget.parentNode.textContent;
      e.explicitOriginalTarget.parentNode.remove();
      deleteNote(activeProject, noteContent);
    })
    noteContainer.append(noteText, trashIcon);
    taskContainer.append(noteContainer);
  })
}

const toggleActiveProject = (project) => {
  let activeProject = document.querySelector('.active-project');
  activeProject.innerText = project;
}
const addProjectsToDom = () => {
  let projContainer = document.querySelector('.projects-nav');
  projContainer.replaceChildren();
  Controller.projectArray.forEach(p => {
    let newProj = document.createElement('span');
    newProj.classList.add('category');
    newProj.innerText = p.getName();
    newProj.dataset.projId = p.getName();
    const trashBlue = new Image();
    trashBlue.src = TrashBlue;
    trashBlue.classList.add('trash-blue');
    trashBlue.addEventListener("click", e => {
      Controller.deleteProject(e.explicitOriginalTarget.parentNode.innerText)
      console.log(Controller.projectArray);
      addProjectsToDom();
    })
    newProj.append(trashBlue);
    newProj.addEventListener('click', e => {
      Controller.projectArray.forEach(p => {
        if (newProj.dataset.projId == p.getName()) {
          console.log(p.noteArray);
          toggleActiveProject(p.getName());
          loadProjectNotes(p);
        }
        let addBar = document.querySelector('.add-container');
        addBar.style.display = 'flex';
      })
    })
    projContainer.append(newProj);
  });
};

document.body.append(container());


// Projects
let projOne = ProjectFactory("project one");
projOne.addNote("TestNote");
projOne.addNote("Test Two");
Controller.addProject(projOne);

let projTwo = ProjectFactory("project two");
projTwo.addNote("test one");
projTwo.addNote("test two");
Controller.addProject(projTwo);
addProjectsToDom();


// <a target="_blank" href="https://icons8.com/icon/124438/add-to-inbox">Add to Inbox</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>