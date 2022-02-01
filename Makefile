docker-build: ~/.npmrc
	echo "Building Dockerfile"
	DOCKER_BUILDKIT=1 docker build \
		-t ${USER}-headless-configure \
		--ssh default \
		-f Dockerfile \
		--build-arg NPM_TOKEN=$(shell grep -o -E "([0-9a-f-]{36}|[0-9A-Za-z_]{40})" ~/.npmrc) \
		.


docker-start:
	docker run -it --rm \
	-v $$PWD/index.js:/app/index.js \
	-v $$PWD/lib:/app/lib \
	-v $$PWD/config:/app/config \
	-v $$PWD/package.json:/app/package.json \
	-p 1449:1449\
	--name headlessConfigure ${USER}-headless-configure
