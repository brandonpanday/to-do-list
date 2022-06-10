import "./css/reset.css";
import "./css/fonts.css";
import "./css/style.css";
import TrashIcon from "./assets/trash-can.png";
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
const loadHeader = () => {
  let headerContainer = document.createElement('section');
  headerContainer.classList.add('header-container');
  let header = document.createElement("header");
  header.classList.add("header");
  let logo = document.createElement('div');
  logo.classList.add('logo');
  let title = document.createElement('h3');
  title.innerText = "TitleHere";
  let subtitle = document.createElement('p');
  subtitle.innerText = "Subtitle here";
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

  let projectsHeader = document.createElement('h3');
  projectsHeader.classList.add("navigation-header");
  projectsHeader.textContent = "Projects";
  nav.append(analyticsHeader, analyticsBtn, projectsHeader);

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
  let addControls = document.createElement('div');
  addControls.classList.add('add-controls');
  let addBtn = document.createElement('button');
  addBtn.innerText = "Add";
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
  cancelBtn.innerText = "Cancel";
  addControls.append(addBtn, cancelBtn);
  addContainer.append(newInput, addControls);

  main.append(infoBar, taskContainer, addContainer);
  return main;
}
const loadProjects = () => {
  let projectsContainer = document.createElement('div');
  projectsContainer.classList.add('projects-container');
  return projectsContainer;
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
  let projContainer = document.querySelector('nav');
  Controller.projectArray.forEach(p => {
    let newProj = document.createElement('span');
    newProj.classList.add('category');
    newProj.innerText = p.getName();
    newProj.dataset.projId = p.getName();
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
const addNewProject = () => {

}

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


