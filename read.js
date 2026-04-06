// write readme description for my project
/* 
  1- download and install docker desktop
  2- run keycloak server 
    a- using docker command: on port 7080
        docker run -p 127.0.0.1:7080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.5.7 start-dev
    b- create realm with name: elearning
    c- got to realm settings screen and in Uesr profile tab, enable the user profile create attripute: profilePicture

    d- go to realm roles screen and create the following roles:
        1- ADMIN
    e- go to users screen and create the following users:
        1-  username: ahmed
            password: 123, temporary: OFF
            email: ahmed@gmail.com
            emial verified: ON
            first name: ahmed
            last name: hassan

        2- username: mohamed
            password: 123, temporary: OFF
            email: mohamed@gmail.com
            emial verified: ON
            first name: mohamed
            last name: Talaat
            in role mapping tap            assign role: ADMIN, realm-admin    


    f- create client with the following settings: 
        id: elearning-users-microservice
        name: elearning-users-microservice
        Client authentication: ON
        Front Channel logout: ON
        in cridentials tab select: Client Id and Secret, copy the secret for later use that will be used in users microservice application.properties file
        in role tap assign the following roles:
            1- ADMIN


    g- create client with the following settings:
        id: elearning-web-app
        name: elearning-web-app
        Valid redirect URIs : http://localhost:4200/*
        Web origins : http://localhost:4200
        client authentication: Off
        standard flow: checked
        direct access grants: checked
        Front Channel logout: ON

 3- create image from Eureka server microservice application on port 8075
    this image created using google JIB plugin, and build configuration is set in the pom.xml file, so you can run the following command to create the image:
    mvn compile jib:dockerBuild
    
 4- gateway microservice application on port 8072 that will be used as API gateway for frontend applicatio 

 
 */