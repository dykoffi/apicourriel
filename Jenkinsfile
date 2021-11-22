pipeline {
  agent {
    node {
      label 'nodejs1'
    }

  }
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
            sh 'ciql db ls'
          }
        }

        stage('install npm package') {
          steps {
            sh 'yarn install'
          }
        }

      }
    }

    stage('deploy') {
      steps {
        sh 'ciql code publish planetserver'
      }
    }

  }
}