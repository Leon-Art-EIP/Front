pipeline{
  
  agent {
        docker {
          image 'node:14-buster'
        }
      }
 
  parameters{
    string(name: 'SPEC', defaultValue: "cypress/integration/**/**", description: "Enter the script path that you want to execute")
    choice(name: 'BROWSER', choices: ['chrome', 'edge', 'firefox'], description: "Choice the browser where you want to execute your tests")
  }
  
  options{
    ansiColor('xterm')
  }
  
  stages{
    stage("Install") {
      steps {
        sh "npm install"
      }
    }
    stage('Building'){
      steps{
        echo "Building..."
      }
    }
    stage('Testing'){
      steps{
        sh "npm i"
        sh "npx cypress run --browser ${BROWSER} --spec ${SPEC}}"
      }
    }
  }
  
  post{
    always{
      publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
    }
  }
}
