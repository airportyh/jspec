
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

task :build => [:package]
task :remove => [:clear]

def version
  @version ||= $1 if File.read('lib/jspec.js').match /version : '(.*?)'/
end