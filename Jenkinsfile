pipeline {
    agent any
    
    environment {
        DOCKERHUB_USERNAME =  "harjeetsingh13" // Change this to your Docker Hub username
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-creds')
        MONGO_URI = credentials('mongo-uri')
        JWT_SECRET = credentials('jwt-secret')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                bat 'dir'
            }
        }
        
        stage('Build Images') {
            steps {
                bat 'docker-compose build'
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                bat 'echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_USERNAME% --password-stdin'
            }
        }
        
        stage('Push Images') {
            steps {
                bat "docker tag employee-management-system_frontend:latest %DOCKERHUB_USERNAME%/ems-frontend:latest"
                bat "docker tag employee-management-system_backend:latest %DOCKERHUB_USERNAME%/ems-backend:latest"
                
                bat "docker push %DOCKERHUB_USERNAME%/ems-frontend:latest"
                bat "docker push %DOCKERHUB_USERNAME%/ems-backend:latest"
            }
        }
        
        stage('Deploy') {
            steps {
                // Create .env file with credentials
                powershell '''
                "MONGO_URI=$env:MONGO_URI" | Out-File -FilePath .env -Encoding utf8
                "JWT_SECRET=$env:JWT_SECRET" | Add-Content -Path .env -Encoding utf8
                '''
                
                // Deploy with docker-compose
                bat 'docker-compose down || echo "No containers to stop"'
                bat 'docker-compose up -d'
            }
        }
    }
    
    post {
        always {
            bat 'docker logout'
        }
    }
}