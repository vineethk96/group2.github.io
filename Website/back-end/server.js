#!/usr/bin/env node

//  SERVER TITLE
//  Author:  AUTHORS NAMES
//  Description:  WHAT DOES THIS PACKAGE DO
//  Version: 0.0.1
//
//  Notes:   Any notes we need to know about the server     

//  Install Instructions
//      npm install moment mysql express ejs ....  
//         OR Groups will get more credit if they use
//      npm install and npm start shortcuts and include a package.json file
//          - See https://docs.npmjs.com/creating-a-package-json-file


const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); //csv-parser：npm install csv-parser

const app = express();
const port = 3000;

let data = [];

fs.createReadStream(path.join(__dirname, './GiGL_SpacesToVisit.csv'))
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    //console.log('Data loaded:', data);

  });



app.get('/test', async (req, res) => {  // test the conncetion
  try {
    res.send('successful');
  } catch (err) {
    res.status(404).send('failed');
  }
});

console.log('Data loaded:', data);


app.get('/data', (req, res) => {  // read the greenspace data
    if (data.length === 0) {
        res.status(500).send('Data is not loaded yet.');
      } else {
        res.json(data);
      }
});


app.listen(port, '0.0.0.0', () => {
  console.log('Server is running');
});
