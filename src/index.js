import "./css/reset.css";
import "./css/fonts.css";
import "./css/style.css";
import TrashIcon from "./assets/trash-can.png";
import { ProjectFactory, Controller, addNoteToProject, deleteNote } from './print.js';

let container = () => {
  let container = document.createElement('div');
  container.classList.add('container');
  container.append(loadHeader(), loadMain());
  return container;
}

let loadHeader = () => {
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

  let analyticsHeader = document.createElement('div');
  analyticsHeader.classList.add("projects-header");
  let analyticsTitle = document.createElement('h5');
  analyticsTitle.innerText = "Analytics";
  analyticsTitle.classList.add("projects-title")
  analyticsHeader.append(analyticsTitle);
  nav.append(analyticsHeader, loadAnalytics());

  let projectsHeader = document.createElement('div');
  projectsHeader.classList.add("projects-header");
  let projectsTitle = document.createElement('h5');
  projectsTitle.innerText = "Projects ▾";
  projectsTitle.classList.add("projects-title");
  projectsHeader.append(projectsTitle);
  nav.append(projectsHeader, loadProjects());

  let footer = document.createElement('footer');
  footer.innerText = "Add Project";
  headerContainer.append(header, nav, footer);
  return headerContainer;
};

let loadAnalytics = () => {
  let analyticsContainer = document.createElement('div');
  analyticsContainer.classList.add('dashboard-container');
  let categoryDashboard = document.createElement('span');
  categoryDashboard.innerText = "Dashboard";
  categoryDashboard.classList.add('category');
  analyticsContainer.append(categoryDashboard);
  return analyticsContainer;
}
let loadProjects = () => {
  let projectsContainer = document.createElement('div');
  projectsContainer.classList.add('projects-container');
  return projectsContainer;
}
let loadMain = () => {
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
  let newInput = document.createElement('input');
  let addBtn = document.createElement('button');
  addBtn.innerText = "Add";
  addBtn.classList.add('add-btn');

  addBtn.addEventListener('click', e => {
    let noteContent = newInput.value;
    console.log(noteContent);
    console.log(activeProject.innerText);
    addNoteToProject(activeProject.innerText, noteContent);
  })

  let cancelBtn = document.createElement('button');
  cancelBtn.innerText = "Cancel";
  addContainer.classList.add('add-container');
  addContainer.append(newInput, addBtn, cancelBtn);

  main.append(infoBar, taskContainer, addContainer);
  return main;
}



let loadProjectNotes = (proj) => {
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
      deleteNote(activeProject, noteContent);
    })

    noteContainer.append(noteText, trashIcon);
    taskContainer.append(noteContainer);
  })
}

let toggleActiveProject = (project) => {
  let activeProject = document.querySelector('.active-project');
  activeProject.innerText = project;
}


// Test addProjects
let addProjectsToDom = () => {
  let projContainer = document.querySelector('.projects-container');
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
      })
    })
    projContainer.append(newProj);
  });
};


document.body.append(container());

let projOne = ProjectFactory("project one");
projOne.addNote("TestNote");
projOne.addNote("Test Two");
Controller.addProject(projOne);

let projTwo = ProjectFactory("project two");
projTwo.addNote("test one");
projTwo.addNote("test two");
Controller.addProject(projTwo);
addProjectsToDom();



