pipeline {
    agent any

    environment {
        DOCKER_HUB = credentials('docker-hub-creds')
        MONGO_URI = credentials('mongo-uri')
        JWT_SECRET = credentials('jwt-secret')
    }

    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 23.x') {
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Images') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_HUB_USR}/ems-frontend ./frontend'
                    sh 'docker build -t ${DOCKER_HUB_USR}/ems-backend ./server'
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    sh 'echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USR --password-stdin'
                    sh 'docker push ${DOCKER_HUB_USR}/ems-frontend'
                    sh 'docker push ${DOCKER_HUB_USR}/ems-backend'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'echo "MONGO_URI=${MONGO_URI}" > .env'
                    sh 'echo "JWT_SECRET=${JWT_SECRET}" >> .env'
                    sh 'docker-compose down || true'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}