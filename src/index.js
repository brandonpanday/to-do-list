import "./css/reset.css";
import "./css/fonts.css";
import "./css/style.css";
import Instagram from "./assets/instagram.png";
import printMe from "./print.js";
import { ProjectFactory, Controller } from './print.js';

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
  activeProject.innerText = "Project Title";
  activeProject.classList.add('active-project');
  projectPath.append(dotDotSlash, activeProject);

  let projectControls = document.createElement('div');
  let newTaskBtn = document.createElement('button');
  newTaskBtn.classList.add('new-task-btn');
  newTaskBtn.innerText = "+ Note";
  projectControls.append(newTaskBtn);
  infoBar.append(projectPath, projectControls);

  let taskContainer = document.createElement('section');
  taskContainer.classList.add('task-container');
  main.append(infoBar, taskContainer);
  return main;
}



// Test addProjects
let addProjectsToDom = () => {
  let projContainer = document.querySelector('.projects-container');
  Controller.projectArray.forEach(p => {
    let newProj = document.createElement('span');
    newProj.classList.add('category');
    newProj.innerText = p.getName();
    projContainer.append(newProj);
  });
}

let loadAddTask = () => {
  let addContainer = document.createElement('div');
  addContainer.classList.add('add-container');
  let header = document.createElement('div');
  header.classList.add('task-header');
  let noteInput = document.createElement('input');
  noteInput.type = 'text';
  noteInput.classList.add('note-input');
  let btnContainer = document.createElement('div');
  btnContainer.classList.add('btn-container');
  let btnAdd = document.createElement('button');
  btnAdd.innerText = "Add";
  btnAdd.classList.add('btn-add');
  let btnCancel = document.createElement('button');
  btnCancel.innerText = "Cancel";
  btnCancel.classList.add('btn-cancel');
  btnContainer.append(btnAdd, btnCancel);
  let footer = document.createElement('div');
  footer.classList.add('task-footer');
  addContainer.append(header, noteInput, btnContainer, footer);
  return addContainer;
}

document.body.append(container());

let main = document.querySelector('main');
main.append(loadAddTask());

let projOne = ProjectFactory("project one");
projOne.addNote("TestNote");
projOne.addNote("Test Two");
projOne.getNotes();

let taco = ProjectFactory("PROJ ONE");
Controller.addProject(taco);
console.log(Controller.projectArray);

addProjectsToDom();

loadAddTask();