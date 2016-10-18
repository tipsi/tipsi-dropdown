require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name           = "TipsiDropdown"
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { :git => 'https://github.com/tipsi/tipsi-dropdown', :tag => s.version }

  s.platform       = :ios, "8.0"

  s.source_files   = "TipsiDropdown/*"

  s.dependency "TPSDropDown"
end
