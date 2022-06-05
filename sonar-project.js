const sonarqubeScanner =  require('sonarqube-scanner');
sonarqubeScanner(
    {
        serverUrl:  'http://localhost:9000',
        options : {
            'sonar.login':'admin',
            'sonar.password':'azerty',
            'sonar.sources':  'src,application/angular-webapp/src',
            // 'sonar.tests':  'tests',
            'sonar.tests':  'application/angular-webapp/src,application/ionic-mobileapp/src',
            'sonar.inclusions'  :  '**', // Entry point of your code
            // 'sonar.test.inclusions':  'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
            'sonar.test.inclusions':  'application/angular-webapp/src/**/*.spec.js,application/angular-webapp/src/**/*.spec.ts,application/ionic-mobileapp/src/**/*.spec.js,application/ionic-mobileapp/src/**/*.spec.ts',
            'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info',
            // 'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml'
        }
    }, () => {});