@ECHO OFF

REM **
REM ** switch to utf-8 codepage
REM **

chcp.com 65001

REM **
REM ** define ZIM_DIR and GH_PAGES_BASE_DIR
REM **

set GH_PAGES_BASE_DIR=%CD%
set GH_PAGES_BASE_DIR_DRV=%CD:~0,2%
set ZIM_CMD=r:\_tool\zim\App\ZimDesktopWiki\zim.exe
set GIT_CMD=d:\pim-wudi\_tool\dev-lang\cygwin\bin\git.exe
set ZIM_FILE=r:\_zim\pub\notebook.zim

dir %GH_PAGES_BASE_DIR%\zim
IF ERRORLEVEL 1 goto END
dir %ZIM_CMD%
IF ERRORLEVEL 1 goto END
dir %GIT_CMD%
IF ERRORLEVEL 1 goto END
dir %ZIM_FILE%
IF ERRORLEVEL 1 goto END

:DO_PUB
REM ** 
REM ** switch to GH_PAGES_BASE_DIR\zim directory
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
REM %ZIM_CMD% --index %ZIM_FILE%
%ZIM_CMD% --export -r -O --template %GH_PAGES_BASE_DIR%\templates\ZeroFiveEight.html --index-page index -o %GH_PAGES_BASE_DIR%\zim %ZIM_FILE%

echo 新的静态 HTML 站点内容已经生成完毕。
pause

REM ** 
REM ** return to original drive and path
REM ** 
%GH_PAGES_BASE_DIR_DRV%
cd %GH_PAGES_BASE_DIR%
goto END

:ERR
echo zim 发布环境尚未准备好，请检查。
pause

:END
