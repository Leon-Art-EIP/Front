pipeline{
  
  agent any
  
  triggers { githubPush() }
  
  tools {nodejs "NodeJS"}
  parameters{
    string(name: 'SPEC', defaultValue: "cypress/e2e/**/**", description: "Enter the script path that you want to execute")
  }
  
  options{
    ansiColor('xterm')
  }
  
  stages{
    stage('Build') {
      steps {
        echo "Build step is empty."
      }
    }
    stage("Install") {
        when { 
            not { 
                branch 'gh-pages' 
            }
        }
      steps {
        sh "npm install"
        sh "npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator"
        sh 'sudo apt-get update'
      }
    }
    stage('Starting Server'){
        when { 
            not { 
                branch 'gh-pages' 
            }
        }
      steps{
        echo "Starting Server..."
        sh 'nohup npm start &'
      }
    }
    stage('Building'){
        when { 
            not { 
                branch 'gh-pages' 
            }
        }
      steps{
        echo "Building..."
      }
    }
    stage('Testing'){
        when { 
            not { 
                branch 'gh-pages' 
            }
        }
      steps{
        sh "npx cypress run --headless --spec ${SPEC} --reporter mochawesome --reporter-options reportDir=cypress,overwrite=false,html=true"
      }
    }
  }
  
  post{
    always{
      publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
    }
  }
}
