pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-creds')
        MONGO_URI = credentials('mongo-uri')
        JWT_SECRET = credentials('jwt-secret')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/HarjeetSingh-13/employee-management-system.git'
            }
        }
        
        stage('Build and Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-creds') {
                        // Build and push frontend
                        dir('frontend') {
                            def frontendImage = docker.build("harjeetsingh13/frontend:latest")
                            frontendImage.push()
                        }
                        
                        // Build and push backend
                        dir('server') {
                            def backendImage = docker.build("harjeetsingh13/backend:latest")
                            backendImage.push()
                        }
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}