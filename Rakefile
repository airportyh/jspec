
desc 'Package jspec.'
task :package => [:clear] do
  begin
    sh "mkdir pkg"
    sh "tar -czf pkg/jspec.tar.gz lib"
  rescue Exception => e
    puts "Failed to package: #{e}."
  else 
    puts "Packaging completed."
  end
end

desc 'Open jspec for development.'
task :open do
  sh 'open -a Firefox test/test.html'
end

desc 'Clear packaging.'
task :clear do
  if File.directory?('pkg')
    sh "rm -fr pkg/*"
    sh "rmdir pkg"
  end
  sh "clear"
end

task :build => [:package]
task :remove => [:clear]