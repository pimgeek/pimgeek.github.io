#!/bin/sh

./rebuild_pages.bat

echo 下面开始修复条目中的图片和视频。
echo
find ./zim -name "*.html" -exec ./fix_media.sh '{}' \; 

echo 下面开始提交网站内容的新版本。
sleep 2

git add ./zim/.
git add ./templates/*.html
git add ./stylesheets/*.css
git commit

echo
echo 请输入 github push 的用户密码：
git push
