# VARIABLES
IMAGEFULLNAME = ui-cabbagesoup.co
GIT_REPO := '$(shell git config --get remote.origin.url)'
GIT_BRANCH := '$(shell git rev-parse --abbrev-ref HEAD)'
GIT_COMMIT := '$(shell git log -1 --format=format:"%H")'
GIT_MESSAGE := '$(shell git log -1 --pretty=%B)'

setup:
	npm install

dockerlocal:
	docker build \
	-f Dockerfile \
	-t ${IMAGEFULLNAME} \
	--build-arg REPO=$(GIT_REPO) \
	--build-arg BRANCH=$(GIT_BRANCH) \
	--build-arg COMMIT=$(GIT_COMMIT) \
	--build-arg MSG=$(GIT_MESSAGE) \
	.

dockerstage:
	docker build \
	-f Dockerfile \
	-t questmaster991/cabbagesoup:${IMAGEFULLNAME} \
	--build-arg REPO=$(GIT_REPO) \
	--build-arg BRANCH=$(GIT_BRANCH) \
	--build-arg COMMIT=$(GIT_COMMIT) \
	--build-arg MSG=$(GIT_MESSAGE) \
	.

	docker push questmaster991/cabbagesoup:${IMAGEFULLNAME}

testcoverage:

lint: setup
	npm run lint