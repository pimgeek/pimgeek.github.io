#!/bin/sh

./pub_to_github.bat

echo
find ./zim -name "*.html" -exec sed -i -r 's/<img src=".*http:\/([^"]*)"/<img src="http:\/\/\1"/ig' '{}' \; 

echo 图片地址已经修复完毕。
echo 按回车键继续……
read

echo
echo 下面开始提交网站内容的新版本。
git add ./zim/.
git add ./templates/*.html
git add ./stylesheets/*.css
git commit

echo
echo 请输入 github push 的用户密码：
git push
