require "json"

package = JSON.parse(File.read(File.join(__dir__, "./package.json")))

Pod::Spec.new do |s|
  s.name           = package['name']
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { :git => 'https://github.com/tipsi/tipsi-dropdown', :tag => s.version }

  s.source_files   = "ios/TipsiDropdown/*.{h,m}"

  s.dependency 'React'
  s.dependency 'TPSDropDown', '~> 1.0'
end
