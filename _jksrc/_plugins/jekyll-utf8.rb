# # 尝试解决 jekyll serve 的 utf8 字符（如中文）文件名问题
# # 默认的 response header 中包含 Content-Type:text/html; charset=ISO-8859-1
# # 所以会有编码问题
# # 这个补丁不能解决中文文件名的编译输出问题，但是可以修正部分页面的显示

# module Jekyll
#   module Commands
#     class Serve

#       class << self
#         alias :_original_webrick_options :webrick_options
#       end

#       def self.webrick_options(config)
#         options = _original_webrick_options(config)
#         options[:MimeTypes]['html'] = 'text/html; charset=utf-8'
#         options
#       end

#     end
#   end
# end