@echo off
set pan=%~d0
set dir=%cd%
echo %pan%
echo %dir%
echo 定位到目录
%pan%
cd %dir%
echo 执行压缩命令
node r.js -o build.js

echo 执行删除命令
set publicDir=public
set publicDir=%dir:~0,-5%%publicDir%

set content=\Content
set content=%publicDir%%content%
rem echo 删除目录%content%
rem rd /s /q %content%

set ViewJSModels=\ViewJSModels
set ViewJSModels=%publicDir%%ViewJSModels%
echo 删除目录%ViewJSModels%
rd /s /q %ViewJSModels%
pause