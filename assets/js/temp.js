/*

const jsxapi = require('jsxapi');

var xapi

const username = "local"
const password = "cisco"
// constants
const PANEL_ID = 'reserved' // May not need this?
const JSXAPI_DEVICE_URL = "10.16.38.90"

/* Returns true if the device detects faces in the conference room and false otherwise.
function peoplePresent() {
    c = xapi.status.get('RoomAnalytics PeopleCount Current').
    catch(console.error)
    return c > 0 ?  true : false
}

/* Returns true if the device is not participating in any calls and false otherwise.
function activeCalls() {
    c = xapi.status.get('SystemUnit State NumbeOfActiveCalls').
    catch(console.error)
    return c > 0 ?  true : false
}

function setupXapi() {
    // Empty passwords are supported
    // Connect to the device
    console.log("connecting to your device...");
    const api = jsxapi.connect(JSXAPI_DEVICE_URL, {
        username: username,
        password: password
    });
    api.on('error', (err) => {
        console.error(`connexion failed: ${err}, exiting`);
        process.exit(1);
    });
    xapi = api
}

function showResMsg() {
    xapi.command('UserInterface Message Alert Display',{
        Title: 'Reserved',
        Text: `Room is reserved by ${user}. Please check back in ${dur*60} minutes.`,
        Duration: dur * 60
    }).catch((error)=>{console.error(error);})
    console.log("Alert sent to device")
}

*/
//TODO - user side alert
function queue(){
    alert("You have been added to the queue.")
}


//TODO - user alert + touchID alert
function book(holdTime){

    alert(`You have called dibs on Team Room 18 for ${holdTime} minutes.`)

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/HoldRequest",
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        data: JSON.stringify({"Duration":holdTime}),
        success: function(result) {
            console.log(result)
        }
        //headers: { 'RoomName': roomName }
    });
}

//xapi = setupXapi()