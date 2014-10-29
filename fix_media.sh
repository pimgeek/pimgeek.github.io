#!/bin/sh

export INPUT=${1}

sed -i -r 's/<img.*src=".*\/http:\/v.youku.com\/v_show\/id_([^/]*).html".*>/<embed src="http:\/\/player.youku.com\/player.php\/sid\/\1\/v.swf" allowFullScreen="true" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application\/x-shockwave-flash"><\/embed>/ig' ${INPUT}
sed -i -r 's/<img.*src=".*\/http:\/([^"]*)\.(jpeg|jpg|png|bmp|gif)".*>/<img src="http:\/\/\1.\2" \/>/ig' ${INPUT}
