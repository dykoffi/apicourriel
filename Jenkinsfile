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
            sh 'ciql db ls'
          }
        }

      }
    }

    stage('Deployment') {
      agent {
        node {
          label 'nodejs1'
        }

      }
      steps {
        sh 'ciql code publish planetserver'
      }
    }

  }
}