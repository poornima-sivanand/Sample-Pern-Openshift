# Sample-Pern-Openshift
Sample Pern Todo App on OpenShift

This repository contains the necessary configuration files required to host the sample PERN stack todo app provided in this [tutorial](https://www.youtube.com/watch?v=ldYcgPKEZC8) on OpenShift.

How to use this Repo?

1. Clone this repository
2. Ensure you have access to OpenShift Namespaces
3. The client and server folders contain the code the tutorial explain about, the openshift folder contains the openshift configurations to build and deploy the client, server and database components.
4. Ensure that the oc command line tool is installed on your local machine.
5. Login to the openshift namespace from your local machine.
6. To deploy the database, run:

` oc process -f openshift/database/db-secrets.yaml | oc apply -f - `

followed by,

` oc process -f openshift/database/db-secrets.yaml | oc apply -f - `

7. To deploy the back end:

Build the backend:
 ` oc process -f openshift/server/bc.yaml | oc apply -f - `
Deploy the backend:
 ` oc process -f openshift/server/dc.yaml -p SERVER_ROUTE='<ROUTE-for-server>'| oc apply -f - `

8. To deploy the frontend:

 8.1. Edit client/src/components/EditTodo.js, and replace <REPLACE_WITH_SERVER_ROUTE> with the server route on line 13.
 
 8.2. Edit client/src/components/InputTodo.js, and replace <REPLACE_WITH_SERVER_ROUTE> with the server route on line 10.
 
 8.3. Edit client/src/components/ListTodo.js, and replace <REPLACE_WITH_SERVER_ROUTE> with the server route on line 12 and 24.
 
 8.4. Build the backend:
  ` oc process -f openshift/client/bc.yaml | oc apply -f - `
  
 8.5. Deploy the backend:
 ` oc process -f openshift/client/dc.yaml -p ROUTE='<ROUTE-for-client>' | oc apply -f - `
