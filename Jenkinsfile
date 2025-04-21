pipeline {
    agent none 

    environment {
        DOCKER_HUB = credentials('docker-hub-creds')
        MONGO_URI = credentials('mongo-uri')
        JWT_SECRET = credentials('jwt-secret')
    }

    stages {
        stage('Checkout') {
            agent any
            steps {
                cleanWs()
                git branch: 'master', 
                url: 'https://github.com/HarjeetSingh-13/employee-management-system.git'
            }
        }

        stage('Build Frontend') {
            agent any
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Images') {
            agent any
            steps {
                sh 'docker build -t ${DOCKER_HUB_USR}/ems-frontend ./frontend'
                sh 'docker build -t ${DOCKER_HUB_USR}/ems-backend ./server'
            }
        }

        stage('Push Images') {
            agent any
            steps {
                sh 'echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USR --password-stdin'
                sh 'docker push ${DOCKER_HUB_USR}/ems-frontend'
                sh 'docker push ${DOCKER_HUB_USR}/ems-backend'
            }
        }

        stage('Deploy') {
            agent any
            steps {
                sh 'echo "MONGO_URI=${MONGO_URI}" > .env'
                sh 'echo "JWT_SECRET=${JWT_SECRET}" >> .env'
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}
