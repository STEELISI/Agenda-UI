# Agenda-UI
This is a node project.
```
$ node --version
v14.19.3
$ npm --version
6.14.17
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

```
$ npm install .
$ ng version
Angular CLI: 12.2.17
Node: 14.19.3
Package Manager: npm 6.14.17
OS: darwin x64
Angular: 12.2.8
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

SSL settings (requires certificate and key files):
```
ng serve --ssl true \
    --ssl-cert "/opt/PIRANHA/Agenda-UI/.ssl/dummy.cer" \
    --ssl-key "/opt/PIRANHA/Agenda-UI/.ssl/dummy.key" \
    --host ""piranha-agenda.isi.edu" \
    --port 4200
```
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
