import "./css/reset.css";
import "./css/fonts.css";
import "./css/style.css";
import Instagram from "./assets/instagram.png";
import printMe from "./print.js";

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
  let projectOne = document.createElement('span');
  /* Project creation method */
  projectOne.innerText = "Test";
  projectOne.classList.add("category");
  projectsContainer.append(projectOne);
  return projectsContainer;
}
let loadMain = () => {
  let main = document.createElement('main');
  let infoBar = document.createElement('div');
  infoBar.classList.add('info-bar');
  let activeProject = document.createElement('span');
  activeProject.innerText = "Project Title";
  activeProject.classList.add('active-project');
  infoBar.append(activeProject);

  let taskContainer = document.createElement('section');
  taskContainer.classList.add('task-container');
  main.append(infoBar, taskContainer);
  return main;
}
document.body.append(container());
