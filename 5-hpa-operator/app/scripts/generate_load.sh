#!/bin/bash
URL="$1";
SERVICE_PATH="hello";

if [ -z "$URL" ]; then
	URL="http://localhost:8080"
	echo "No URL provided! Using ${URL}"
fi

# Load Generation
echo "Generating load on ${URL}/${SERVICE_PATH}"

while true; do
	curl -s ${URL}/${SERVICE_PATH} > /dev/null;
	echo -n .;
	sleep 0.001;
done