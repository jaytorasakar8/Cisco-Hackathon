//constants
const jsxapi = require('jsxapi')
const express = require('express')
const bodyParser = require('body-parser')
const username = "" //Username of the Cisco Video Conference Equipment
const password = "". //Password of the Cisco Video Conference Equipment
const JSXAPI_DEVICE_URL = "" //IP Address of the Cisco Video Conference Equipment
const port = 8080

var app = express()

function setupXapi() {
    // Empty passwords are supported
    // Connect to the device
    console.log("Connecting to your device...");
    const xapi = jsxapi.connect(JSXAPI_DEVICE_URL, {
        username: username,
        password: password
    });
    xapi.on('error', (err) => {
        console.error(`Connection failed: ${err}, exiting`);
        process.exit(1);
    });
    return xapi
}

function showResMsg(xapi, duration) {
    var roomName = "Team Room 18"
    var dur = parseInt(duration, 10)
    var text = `Jay has called dibs on ${roomName}. Please check back in ${dur} minutes.`
    xapi.command('UserInterface Message Alert Display',{
        Title: 'Reserved',
        Text: text,
        Duration: dur*60
    }).catch((error)=>{console.error(error);})
    console.log(`Alert sent to device with msg: '${text}'`)
}

xapi = setupXapi()

// POST method route
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json());
app.use('/assets/css', express.static('<filepath>/assets/css'));//Importing CSS folder
app.use('/assets/images', express.static('/<filepath>/assets/images'));
app.use('/assets/js', express.static('/<filepath>/assets/js'));
app.use('/assets/fonts', express.static('/<filepath>/assets/fonts'));
app.get('/', function(request, response){
    response.sendFile('/<filepath>/index.html');
});

app.post('/HoldRequest', function (req, res) {
    origin = req.get("Origin")
    var dur = req.body.Duration
    var roomName = req.get("RoomName")
    console.log(req.body)
    showResMsg(xapi, req.body.Duration)
    res.header("Access-Control-Allow-Origin", origin)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify({"Status": "Ok"}))
})

app.listen(port, (err) => {
    if (err) {
        return console.log('An error occurred while listening on port', err)
    }

    console.log(`Server is listening on ${port}`)
})
