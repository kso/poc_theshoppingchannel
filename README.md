Demos
=====

This project contains the responsive demo as seen here: http://quickstart.groupbyinc.com/demo-responsive

Please fork this repository to make changes.  You probably will not be given commit access if you 
are external to GroupBy.  If you make changes that you think would be beneficial to make it into 
the core demo, please send a pull request.

The demo-responsive project is a maven based project. Download maven and put the bin folder on your system path variable.

To make the project run, you will need a copy of the api-java.jar which does not ship with the demo. 
This jar is available from your local installation of the searchandiser command center.  
Log in to command center, then navigate to downloads and download the java-api.jar and install it into your local
maven repository.

    mvn install:install-file -Dfile=api-java.jar -DgroupId=groupby -DartifactId=api-java -Dversion=0.1.0 -Dpackaging=jar

If you do not have a copy of the searchandiser, you can download it from here.

http://www.groupbyinc.com/downloads

Once you have everything installed, you can start the demo by running 

    demo-responsive/run.sh 

Email dwayne.remekie@groupbyinc.com for download credentials.

The archives folder contains legacy demo content.
