This is a starter kit for Hack Oregon front-end development using React + Redux.
This is a clone of the [Hack Oregon Starter kit](https://github.com/hackoregon/hackoregon-frontend-starter).

#### Guide
1. Get [Node 6.5 +](https://nodejs.org) - I recommend using [Node Version Manager](https://github.com/creationix/nvm#install-script):
2. `git clone https://github.com/hackoregon/team-budget-frontend.git`.
3. `nvm install 6.9.5` and `nvm use` (sets your node version)
3. install [yarn](https://yarnpkg.com/en/docs/install) (using yarn instead of npm for installing dependencies will help keep versions in sync more easily), and run `yarn` from inside the repo to install dependencies.
4. `npm start` - start dev mode (watching tests + linter)
5. `npm test` - run tests
6. `npm run coverage` - run tests w/ coverage


#### Using the [Component Library](https://github.com/hackoregon/component-library) in your project
The component libary has been installed as a dependency from an npm build, make sure the version in package.json matches the latest version in the component library repo to have access to all the latest components.  
(https://www.npmjs.com/package/@hackoregon/component-library)

To use a component in your project, import the precompiled component from the lib folder  

Example:  importing the Header component from the component library  

`import Header from '@hackoregon/component-library/lib/Navigation/Header';`
