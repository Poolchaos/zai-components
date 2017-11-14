#!/usr/bin/groovy
@Library('jenkins-pipeline-library@master')
import com.zailab.*

def notifier = new NotificationsEmitter()
def npm = new Npm()
def jspm = new Jspm()
def gulp = new Gulp()
def node = new Node()
def docker = new Docker()
def kubernetes = new Kubernetes()
def versioning = new Versioning()

def registryHost = "gitlab.zailab.com"
def registryPort = 5005
def registryNamespace = "application-frontend"
def projectName
def kubernetesNamespace = 'default'
def version
def imageTag

// https://jenkins.io/doc/book/pipeline/syntax/

try {
	nodejs6Node {
		stage('clone code') {
			checkout scm
		}

		stage('load config') {
			version = node.getVersion()
			projectName = node.getName()
			imageTag = "${registryHost}:${registryPort}/${registryNamespace}/${projectName}:${version}"
		}

		stage('install npm dependencies') {
			npm.installDependencies()
			// the npm version included in the node:4.3.0 has a bug : https://github.com/npm/npm/pull/10582
			//npm.install("npm@2.11.3", true)
			npm.install("jspm", true)
			npm.install("gulp", true)
			npm.install("jspm-git", true)
			npm.install()
		}

		stage('jspm thingies') {
			jspm.config()
			jspm.install()
		}

		stage('build javascript') {
			gulp.bundle()
		}

		stage('build docker image') {
			docker.build(imageTag)
			docker.push(imageTag)
		}

		stage('generate deployment resources') {
			def config = [projectName     : projectName,
							  projectNamespace: kubernetesNamespace,
							  projectVersion  : version,
							  imageTag        : imageTag]

			kubernetes.generateResources(config)

			archiveArtifacts artifacts: 'kubernetes.yaml', fingerprint: true
			stash includes: 'kubernetes.yaml', name: 'kubernetes-stash'
		}

		stage('STAGING - deploy approval') {
			waitForApproval {
				message = "Let\'s deploy to staging"
			}
		}
	}

	deployNode {
		unstash 'kubernetes-stash'

		stage('STAGING - deploy') {
			kubernetes.apply(stagingConfig, "kubernetes.yaml")
		}

		//stage('STAGING - versioning update') {
		//	versioning.update(stagingConfig, projectName, version)
		//}
	}

	stage('PROD - approval') {
		waitForApproval {
			message = "Let\'s deploy to production"
		}
	}
	deployNode {
		unstash 'kubernetes-stash'

		stage('PROD - deploy') {
			kubernetes.apply(productionConfig, "kubernetes.yaml")
		}

		//stage('PROD - versioning update') {
		//	versioning.update(productionConfig, projectName, version)
		//}
	}
} catch (e) {
	notifier.sendEmailNotification("FAILED")
	throw e
}
