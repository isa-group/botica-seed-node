@echo off
setlocal EnableDelayedExpansion

REM Navigate to the script's directory
pushd "%~dp0"

for /f "delims=" %%i in ('npm pkg get imageTag') do (
    set IMAGE_TAG=%%i
    set IMAGE_TAG=!IMAGE_TAG:"=!
)

echo Building Docker image with tag %IMAGE_TAG%...

docker build -t "%IMAGE_TAG%" .
if %ERRORLEVEL% NEQ 0 (
    echo Docker build failed. Exiting.
    popd
    exit /b 1
)

echo Docker image built successfully with tag %IMAGE_TAG%.

REM Return to the original directory
popd
