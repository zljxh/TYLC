@echo off
set pan=%~d0
set dir=%cd%
echo %pan%
echo %dir%
echo ��λ��Ŀ¼
%pan%
cd %dir%
echo ִ��ѹ������
node r.js -o build.js

echo ִ��ɾ������
set publicDir=public
set publicDir=%dir:~0,-5%%publicDir%

set content=\Content
set content=%publicDir%%content%
rem echo ɾ��Ŀ¼%content%
rem rd /s /q %content%

set ViewJSModels=\ViewJSModels
set ViewJSModels=%publicDir%%ViewJSModels%
echo ɾ��Ŀ¼%ViewJSModels%
rd /s /q %ViewJSModels%
pause