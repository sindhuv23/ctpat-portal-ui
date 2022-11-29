#!/bin/sh

set -o pipefail

script="$BASH_SOURCE"
[ -z "$BASH_SOURCE" ] && script="$0"
BUILD_SOURCE_DIR=$(cd `dirname $0` && pwd)
#BUILD_SOURCE_DIR=$(pwd)

Usage() {
echo Syntax : '$script <build>'
echo Example : $script development
echo Example : $script release
}

#Deafult Values
: "${JOB_BASE_NAME:=ctpat-pui}"
: "${BUILD_DISPLAY_NAME:=1}"
: "${STAGE_NAME:=Angular build}"

if [ "$#" -ne 1 ];then
   echo "${JOB_BASE_NAME} build ${BUILD_DISPLAY_NAME} failed to execute ${STAGE_NAME}.Missing required arguments for ${script}.Specify development or release build.Current $# argument(s)."
   Usage
   exit 1
fi



BUILD_ENV=$1
if [[ "$BUILD_ENV" != "development" && "$BUILD_ENV" != "release" && "$BUILD_ENV" != "dev" && "$BUILD_ENV" != "rel" ]]; then
	echo "${BUILD_ENV} is not valid build argument.${JOB_BASE_NAME} build ${BUILD_DISPLAY_NAME} failed to execute ${STAGE_NAME}.Missing required arguments for ${script}.Specify development or release build."
   	Usage
   	exit 1
fi




UI_SOURCE_FOLDER=${BUILD_SOURCE_DIR}/src-ui
DEST_FOLDER=${BUILD_SOURCE_DIR}/src/main/resources/public
TARCMD=`which tar`
NPMCMD=`which npm`


echo "Building ${BUILD_ENV} ${BUILD_DISPLAY_NAME} ${STAGE_NAME} by ${script}"
echo "****  build source dir:    " ${BUILD_SOURCE_DIR}
echo ${UI_SOURCE_FOLDER}


if [ ! -d ${UI_SOURCE_FOLDER} ]; then
	 echo 'Missing ui source folder ${UI_SOURCE_FOLDER}'
	 exit 1
fi

if [ ! -f ${UI_SOURCE_FOLDER}/package.json ]; then
	 echo 'No package.json in ui source folder ${UI_SOURCE_FOLDER}.Nothing build.'
	 exit 1
fi


Prepare_Node() {
	echo "Install npm dependencies..."
	# Prepare Node environemnt
	cd ${UI_SOURCE_FOLDER}
	${NPMCMD} install --no-optional
	${NPMCMD} install @angular/cli@14.0.2 --no-optional
}



Build_UI() {
	echo "Transpiling Angular application for $BUILD_ENV..."
	# Prepare Node environemnt
	cd ${UI_SOURCE_FOLDER}

	if [[ "$BUILD_ENV" == "development" || "$BUILD_ENV" == "dev" ]]; then
		echo '****************  RUNNING DEV BUILD ******************'
        ${NPMCMD} run build:proxyDev
		#TODO: Generate NPm DOC for dev
	elif [[ "$BUILD_ENV" == "release" || "$BUILD_ENV" == "rel" ]]; then
		${NPMCMD} run build:proxyRel
	else
		echo $JOB_BASE_NAME build $BUILD_DISPLAY_NAME failed to $STAGE_NAME.unknow build environemnt argument for $script.Specify development or release build only.
   		Usage
   		exit 1		
	fi
}

Prepare_Proxy_Index() {
	echo '****************  PROXY INDEX FX  ******************'
    
	cp ${UI_SOURCE_FOLDER}/src/index.html ${DEST_FOLDER}/index.html
    
    if [ ! -f ${DEST_FOLDER}/index.html ]; then
		 echo 'Unable find index page in build destination folder ' ${DEST_FOLDER}
		 exit 1
	fi
	cd ${DEST_FOLDER}
	cp ${DEST_FOLDER}/index.html ${DEST_FOLDER}/index.proxy.html
    cp ${DEST_FOLDER}/index.html ${DEST_FOLDER}/index.seal.html
    sed 's/\"\/nace\/ace\/ctpat\/ctpat-pui\//\"\/ace\/ctpat\/ctpat-pui\//g' <${DEST_FOLDER}/index.seal.html >${DEST_FOLDER}/index.proxy.html
    sed 's/\"\/nace\/ace\/ctpat\/ctpat-pui\//\"\/ctpat-pui\//g' <${DEST_FOLDER}/index.seal.html >${DEST_FOLDER}/index.html
	if [ ! -f ${DEST_FOLDER}/index.html ]; then
		 echo 'Failed to create index page in folder ' ${DEST_FOLDER}
		 exit 1
	fi
}

Prepare_Build_Info() {
#GIT_REVISION
#BUILD_ID=195
#RELEASE_TAG
#BUILD_TIMESTAMP_DATE
echo "#TODO: Prepare_Build_Info"
}

Package_Build(){
	#TODO:coll Note: the copy command below is new (i.e. added by ctpat)
	echo Copying dist to output dir: ${DEST_FOLDER}
	
	echo Packaging build output files...
	cd ${DEST_FOLDER}
	${TARCMD} -cvf ace-ctpat-pui.tar *
}

ls -ltr ${UI_SOURCE_FOLDER}
Prepare_Node
Build_UI
Prepare_Proxy_Index
Prepare_Build_Info
Package_Build
# List Destination Source UI
ls -ltr ${DEST_FOLDER}

echo "Completed building ${BUILD_DISPLAY_NAME} ${STAGE_NAME} by $script with $# argument(s)"
