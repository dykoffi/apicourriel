pipeline {
  agent any
  stages {
    stage('test ciql cmd') {
      parallel {
        stage('test ciql cmd') {
          steps {
            sh 'ciql info inspect'
          }
        }

        stage('List servers saved') {
          steps {
            sh 'ciql server ls'
          }
        }

        stage('List DB saved') {
          steps {
            sh 'ciql bd ls'
          }
        }

      }
    }

    stage('tester le projet') {
      steps {
        sh 'yarn test'
      }
    }

    stage('Deployer') {
      steps {
        sh 'ciql code publish planetserver --db planetDB'
      }
    }

  }
}