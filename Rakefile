
desc 'Package jspec.'
task :package => [:clear] do
  begin
    sh 'mkdir pkg'
    sh 'cp -fr lib/* pkg'
    sh "jsmin < lib/jspec.js > pkg/jspec.min.js"
  rescue Exception => e
    puts "Failed to package: #{e}."
  else 
    puts "Packaging of JSpec-#{version} completed."
  end
end

desc 'Open jspec for development.'
task :open do
  sh 'open -a Firefox test/test.html'
end

desc 'Clear packaging.'
task :clear do
  if File.directory? 'pkg'
    sh 'rm -fr pkg/*'
    sh 'rmdir pkg'
  end
end

desc 'Display current version'
task :version do
  puts "JSpec-#{version}"
end

desc 'Release to VERSION. Note: update history first'
task :release do
  raise 'VERSION required' unless ENV['VERSION']
  contents = File.read 'lib/jspec.js'
  contents.sub! /#{version}/, ENV['VERSION']
  File.open('lib/jspec.js', 'w+') do |file|
    file.write contents
  end
  task(:package).invoke
  sh "git commit -m '- Release #{version}'"
  sh "git push && git tag #{version} && git push --tags"
end

task :build => [:package]
task :remove => [:clear]

def version
  $1 if File.read('lib/jspec.js').match /version : '(.*?)'/
end