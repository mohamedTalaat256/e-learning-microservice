# E-Learning Microservices Setup Guide

This guide walks you through setting up the required environment and services for the e-learning system, including Keycloak authentication, Docker setup, and microservices configuration.

---

## 1. Install Docker Desktop

* Download and install Docker Desktop from the official website.
* Ensure Docker is running before proceeding.

---

## 2. Run Keycloak Server

### a. Start Keycloak using Docker

Run the following command to start Keycloak on port **7080**:

```bash
docker run -p 127.0.0.1:7080:8080 \
-e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
-e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
quay.io/keycloak/keycloak:26.5.7 start-dev
```

* Access Keycloak at: http://127.0.0.1:7080
* Login باستخدام:

  * Username: `admin`
  * Password: `admin`

---

### b. Create Realm

* Create a new realm with name:

```
elearning
```

---

### c. Configure User Profile

* Go to **Realm Settings**
* Open **User Profile** tab
* Enable User Profile
* Create a new attribute:

```
profilePicture
```

---

### d. Create Roles

* Navigate to **Realm Roles**
* Create the following role:

```
ADMIN
```

---

### e. Create Users

#### User 1:

* Username: `ahmed`
* Password: `123` (Temporary: OFF)
* Email: `ahmed@gmail.com`
* Email Verified: ON
* First Name: `ahmed`
* Last Name: `hassan`

#### User 2:

* Username: `mohamed`
* Password: `123` (Temporary: OFF)
* Email: `mohamed@gmail.com`
* Email Verified: ON
* First Name: `mohamed`
* Last Name: `Talaat`

**Role Mapping:**

* Assign roles:

  * `ADMIN`
  * `realm-admin`

---

### f. Create Backend Client (Users Microservice)

* Client ID: `elearning-users-microservice`
* Name: `elearning-users-microservice`
* Client Authentication: ON
* Front Channel Logout: ON

#### Credentials:

* Go to **Credentials Tab**
* Select:

  * Client ID and Secret
* Copy the generated **Client Secret** (used later in backend `application.properties`)

#### Roles:

* Assign role:

  * `ADMIN`

---

### g. Create Frontend Client (Web App)

* Client ID: `elearning-web-app`
* Name: `elearning-web-app`

#### Settings:

* Valid Redirect URIs:

```
http://localhost:4200/*
```

* Web Origins:

```
http://localhost:4200
```

* Client Authentication: OFF
* Standard Flow: Enabled
* Direct Access Grants: Enabled
* Front Channel Logout: ON

---

## 3. Build Eureka Server Docker Image

* The Eureka Server runs on port **8075**
* Image is built using **Google JIB plugin**

### Build Command:

```bash
mvn compile jib:dockerBuild
```

* Ensure JIB configuration is properly set in `pom.xml`

---

## 4. Gateway Microservice

* The Gateway runs on port **8072**
* It acts as the API Gateway for the frontend application
* Routes all incoming requests to appropriate microservices

---

## Notes

* Make sure all required ports are available:

  * 7080 → Keycloak
  * 8075 → Eureka Server
  * 8072 → Gateway
  * 4200 → Angular Frontend

* Ensure Docker is running before executing any container-related commands.

---

## Summary

This setup includes:

* Keycloak for authentication and authorization
* Eureka Server for service discovery
* API Gateway for routing
* Docker for containerization

You are now ready to run and integrate your microservices with secure authentication.
