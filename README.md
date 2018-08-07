##Phonebook

This project is a personal, mobile orientated phonebook app.

Here you can checkout finaly version - [GhPages].(https://arseniibylym.github.io/phonebook/)

It's a single page react app, that simulate multiple page app with react-router mode. 
It use firebase storage and DB for save contacts photo and data. At this point app use one common storage for all app's users, but if it necessarily, it could be easily changed into app with personal data for each user with import firebase auth and create personal data folder with limited access rights.  

App contains next pages (which switch with react-router):
- contacts 
- add new
- last contacts 
- search 

###Contacts

It's a starting page which show all user's contacts with short list of data (photo, name, last name, phone). In online connection data takes from Firebase storage and put into Redux global storage. If connection is offline, data takes from browser localStorage.
By clicking user get page with all contact info.

###Add new

Input form is able to create new user and store data into Firebase storage and Redux storage.
All fields pass validation and have to be fill, except add photo field. If user didn't set a photo, at contact form will show default image.

###Last contacts

It shows last five calls with define contact and time of the call. Time set when user click call button. This data store into redux storage and browser localStorage.

###Find

This page allows to search contacts by first letters of the name or last name.
It dinamycly shows contacts list.

##Offline using

The app could be use offline with help PWA technology. Sw.js file runs a service worker, which cached some static data and all dynamic data.

Users can add icon to the device desktop for more convenient usage. 

App also uses Semantic.UI lib for styling and reselect library for more convinient operating redux global storage
