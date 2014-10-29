#!/bin/sh

./rebuild_pages.bat

find ./zim -name "*.html" -exec sed -i -r 's/src=".*\/http:\/([^"]*)"/src="http:\/\/\1"/ig' '{}' \; 

echo 图片地址已经修复完毕。
sleep 2

echo
echo 下面开始提交网站内容的新版本。
sleep 2
git add ./zim/.
git add ./templates/*.html
git add ./stylesheets/*.css
git commit

echo
echo 请输入 github push 的用户密码：
git push
