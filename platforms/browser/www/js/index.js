/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        document.getElementsByTagName('button')[0].addEventListener("click", openBrowser);
        document.getElementsByTagName('button')[1].addEventListener("click", openCamera);
        document.getElementsByTagName('button')[2].addEventListener("click", createEvent);
        $(document).ready( function() {
            alert("Your book is overdue.");
            $('.gauge').gauge({
              values: {
                0 : '0',
                20: '2',
                40: '4',
                60: '6',
                80: '8',
                100: '10'
              },
              colors: {
                0 : '#666',
                60: '#ffa500',
                80: '#f00'
              },
              angles: [
                180,
                360
              ],
              lineWidth: 10,
              arrowWidth: 20,
              arrowColor: '#ccc',
              inset:true,

              value: 30
            });
        });


    }
};

function openBrowser(){
  var ref = cordova.InAppBrowser.open('http://www.google.com', '_blank', 'location=yes');
}

function openCamera(){
  navigator.camera.getPicture(function(){}, function(){}, {saveToPhotoAlbum: true});
}

function createEvent(){
  var title = 'My Event Title';
  var location = 'My Event Location';
  var notes = 'My interesting Event notes.';
  var startDate = new Date();
  var endDate = new Date();
  var calendarName = "MyCal";

  // clean up the dates a bit
  startDate.setMinutes(0);
  endDate.setMinutes(0);
  startDate.setSeconds(0);
  endDate.setSeconds(0);

  // add a few hours to the dates, JS will automatically update the date (+1 day) if necessary
  startDate.setHours(startDate.getHours()+2);
  endDate.setHours(endDate.getHours()+3);
  var success = function(message) { alert("Success: " + JSON.stringify(message)); };
  var error = function(message) { alert("Error: " + message); };
  // create an event interactively
  window.plugins.calendar.createEventInteractively(title, location, notes, startDate, endDate, success, error);
}
