const sonarqubeScanner =  require('sonarqube-scanner');
sonarqubeScanner(
    {
        serverUrl:  'http://localhost:9000',
        options : {
            'sonar.login':'admin',
            'sonar.password':'azerty',
            'sonar.sources':  'src,application/angular-webapp/src/app,application/ionic-mobileapp/src/app',
            'sonar.tests':  '',
            'sonar.inclusions'  :  '**', // Entry point of your code
            // 'sonar.test.inclusions':  'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
            'sonar.test.inclusions':  'src/**/*.spec.ts,application/angular-webapp/src/app/**/*.spec.ts,application/ionic-mobileapp/src/app/**/*.spec.ts',
            'sonar.javascript.lcov.reportPaths':'coverage/lcov.info,application/angular-webapp/coverage/angular-webapp/lcov.info,application/ionic-mobileapp/coverage/ngv/lcov.info',
            // 'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml'
        }
    }, () => {});