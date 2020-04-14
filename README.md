#To start run following commands

npm i
node app.js

or 


same code can be containerize using Docker and deploy using Kubernetes to scaleup and scale down as per traffic.

docker build -t imagename:latest .
docker run -p 11000:11000 -it --name containername imagename:latest


------------------------------------------------------------------------------------------------------

#Usage and features added:

1. Add a smart device:
http://localhost:11000/api/v1/device POST request with sample body {"deviceName":"watch","status":"off","connectionStatus":"ok","powerSupply":"battery","connectionType":"wired"}

2. Update a smart device:
http://localhost:11000/api/v1/device/<deviceID> PUT request with sample body {"deviceName":"watch","status":"on","connectionStatus":"ok","powerSupply":"battery","connectionType":"wired"}

3. Get all registered smart devices:
http://localhost:11000/api/v1/device GET request.

4. Get a registered smart device:
http://localhost:11000/api/v1/device/<deviceID> GET request.

5. Delete a registered smart device:
http://localhost:11000/api/v1/device/<deviceID> DELETE request.



#What more can be added or improve or optimise:

1. healthcheck api can be added to check whether this microservice is up or not.
2. posthook and prehook of mongoose can be used for validation purpose.
3. Filter and count api can be added for pagination.
4. Delete can be soft or hard, I assumed as hard delete for mongo document.
5. Docker and kubernetes addition for machine independent development and scaling up and scaling down, horizontal and vertical scaling, auto scaling as per traffic load.
6. DeviceType key can be added in mongoose schema so that later it will be easy to scaleup or have different microservice for different deviceType.
7. Ability to add many smart devices at one api call, it will reduce I/O requests.
8. Ability to delete many smart devices at one api call,it will reduce I/O requests.
9. PATCH http api can be added if few fields will be updated.
