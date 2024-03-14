pipeline{
  
    agent {
        label 'docker-slave'
    }
    
    triggers { githubPush() }

    tools {nodejs "NodeJS"}

    options{
        ansiColor('xterm')
    }
    
    stages {
        stage("Install") {
            steps {
                sh "sudo dnf install openssl1.1 -y"
                sh "npm install -g yarn"
                sh "yarn install --network-timeout 100000"
            }
        }
        stage('Testing'){
            steps{
                script {
                    try {
                        sh 'yarn run coverage | tee tests.log'
                         sh 'sed -r "s/\\x1B\\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" tests.log > tests_clean.log'
                    } catch (Exception e) {
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }
    stage('Push to DockerHUb')
    {
      when { 
        branch 'dev'
      }
      steps{
        script {
            try {
                echo "Pushing to DockerHub..."
                sh "docker build --build-arg NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL} -t ${DOCKER_USERNAME}/${DOCKER_REPO_DEV_FRONT}:latest -t ${DOCKER_USERNAME}/${DOCKER_REPO_DEV_FRONT}:${BUILD_NUMBER} ."
                sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                sh "docker push ${DOCKER_USERNAME}/${DOCKER_REPO_DEV_FRONT}:latest"
                sh "docker push ${DOCKER_USERNAME}/${DOCKER_REPO_DEV_FRONT}:${BUILD_NUMBER}"
                echo "Pushed to DockerHub!"
                echo "Cleaning up..."
                sh "docker rmi ${DOCKER_USERNAME}/${DOCKER_REPO_DEV_FRONT}:latest"
                sh "docker rmi ${DOCKER_USERNAME}/${DOCKER_REPO_DEV_FRONT}:${BUILD_NUMBER}"

                cleanWs(cleanWhenNotBuilt: false,
                        deleteDirs: true,
                        disableDeferredWipeout: true,
                        notFailBuild: true,
                        patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                                        [pattern: '.propsfile', type: 'EXCLUDE']])
            } catch (Exception e){
                echo "Stage failed due to exception: ${e}"
                error("Failed to push to DockerHub.")
            }
        }
      }
    }
  }
  
  post {
        always {
            script {
                def logContent = "```\n" + readFile('tests_clean.log').trim() + "\n```"
                def branchName = env.BRANCH_NAME
                def userName = env.CHANGE_AUTHOR
                def buildNumber = env.BUILD_NUMBER

                discordSend(
                    webhookURL: "https://discord.com/api/webhooks/1123846491438583859/SlPmshTyfkaePCJ0xJZIhja219nY5mezlxGGSyPWRhzUvxnxI2gG2PZ9RK-jRR3Hb3ne",
                    title: "${env.JOB_NAME}",
                    description: """
                        Branch: ${branchName}
                        User: ${userName}
                        Log Content:
                        ${logContent}
                    """,
                    footer: "Build Number: ${buildNumber}",
                    result: currentBuild.currentResult
                )
            }
            cleanWs(cleanWhenNotBuilt: false,
               deleteDirs: true,
               disableDeferredWipeout: true,
               notFailBuild: true,
               patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])

            junit '**/test-results/*.xml'
        }
    }
}