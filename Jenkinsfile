pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "harjeetsingh13"
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-creds')
        MONGO_URI = credentials('mongo-uri')
        JWT_SECRET = credentials('jwt-secret')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh 'echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                docker tag employee-management-system_frontend:latest $DOCKERHUB_USERNAME/ems-frontend:latest
                docker tag employee-management-system_backend:latest $DOCKERHUB_USERNAME/ems-backend:latest

                docker push $DOCKERHUB_USERNAME/ems-frontend:latest
                docker push $DOCKERHUB_USERNAME/ems-backend:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "MONGO_URI=$MONGO_URI" > .env
                echo "JWT_SECRET=$JWT_SECRET" >> .env

                docker-compose down || echo "No containers to stop"
                docker-compose up -d
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
