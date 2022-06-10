const ProjectFactory = (name) => {
  let noteArray = [];
  const getName = () => name;
  const addNote = (desc) => {
    noteArray.unshift(desc);
  }
  return { getName, noteArray, addNote };
};

const Controller = (() => {
  let projectArray = [];
  const addProject = (project) => projectArray.unshift(project);
  const getProjects = (project) => {
    project.forEach(p => {
      console.log(p);
      return p;
    })
  }
  const deleteProject = (proj) => {
    projectArray.forEach(p => {
      if (proj == p.getName()) {
        let i = projectArray.indexOf(p);
        projectArray.splice(i, 1);
      }
    })
  }
  return { projectArray, addProject, deleteProject };
})();


const addNoteToProject = (ap, nc) => {
  Controller.projectArray.forEach(p => {
    if (ap == p.getName()) {
      p.addNote(nc);
      return p;
    }
  })
}

const deleteNote = (ap, nc) => {
  Controller.projectArray.forEach(p => {
    if (ap == p.getName()) {
      p.noteArray.forEach(n => {
        if (n == nc) {
          let i = p.noteArray.indexOf(n);
          p.noteArray.splice(i, 1);
          console.log(p.noteArray);
        }
      })
    }
  })
}

export { ProjectFactory, Controller, addNoteToProject, deleteNote };

