

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'home', 'welcome'],       name: 'home',       moduleId: 'pages/home', nav: true, title: 'Home'},
      { route: 'tasks',            name: 'tasks',      moduleId: 'pages/tasks', nav: true, title: 'Tasks'},
      { route: 'addTask',          name: 'addtask',    moduleId: 'pages/addTask', nav: true, title: 'Add' },
      { route: 'signin',          name: 'signin',    moduleId: 'pages/signin', nav: true, title: 'Sign In' },
      { route: 'signout',          name: 'signout',    moduleId: 'pages/signout', nav: true, title: 'Sign Out' },
      { route: 'signup',          name: 'signup',    moduleId: 'pages/signup', nav: false, title: 'signup' }
    ]);
  }

  
}