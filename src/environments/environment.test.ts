import packageJson from '../../package.json';

export default {
    appName: 'Sales',
    envName: 'TEST',
    production: false,
    test: true,
    i18nPrefix: '',
    versions: {
      app: packageJson.version,
      angular: packageJson.dependencies['@angular/core'],
      material: packageJson.dependencies['@angular/material'],
      rxjs: packageJson.dependencies.rxjs,
      angularCli: packageJson.devDependencies['@angular/cli'],
    },
};

