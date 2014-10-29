@ECHO OFF

REM **
REM ** switch to utf-8 codepage
REM **

chcp.com 65001

REM **
REM ** define ZIM_DIR and GH_PAGES_BASE_DIR
REM **

set START_PATH=%CD%
set START_DRV=%CD:~0,2%
set ZIM_CMD=r:\_tool\zim\App\ZimDesktopWiki\zim.exe
set GIT_CMD=d:\pim-wudi\_tool\dev-lang\cygwin\bin\git.exe
set GH_PAGES_BASE_DIR=r:\_dev\github\pimgeek.github.io
set GH_PAGES_BASE_DIR_DRV=%GH_PAGES_BASE_DIR:~0,2%
set ZIM_FILE=r:\_zim\pub\notebook.zim

dir %GH_PAGES_BASE_DIR%\zim
IF ERRORLEVEL 0 goto DO_PUB
IF ERRORLEVEL 1 goto END

:DO_PUB
REM ** 
REM ** switch to GH_PAGES_BASE_DIR directory
REM ** 
%GH_PAGES_BASE_DIR_DRV%
cd %GH_PAGES_BASE_DIR%\zim

REM ** 
REM ** delete all files under GH_PAGES_BASE_DIR (also delete directories)
REM ** 
del /q /s %GH_PAGES_BASE_DIR%\zim\*.*
for /d %%i in (%GH_PAGES_BASE_DIR%\zim\*.*) do rmdir /q /s %%i

echo.
echo 前一次的静态 HTML 站点内容已经被清空。
pause

REM ** 
REM ** do publish to github operations
REM ** 
%ZIM_CMD% --index %ZIM_FILE%
%ZIM_CMD% --export -r -O --template %GH_PAGES_BASE_DIR%\templates\ZeroFiveEight.html --index-page index -o %GH_PAGES_BASE_DIR%\zim %ZIM_FILE%

echo 新的静态 HTML 站点内容已经生成完毕。
pause

REM ** 
REM ** return to start drive and path
REM ** 
%START_DRV%
cd %START_PATH%

:END
