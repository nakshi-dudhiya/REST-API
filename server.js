//StAuth102222: I Nakshi Dudhiya, 000793267 certify that this material is my original work.
// No other person's work has been used without due acknowledgement. 
//I have not made my work available to anyone else."

const express = require('express');
const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

const app =  express();
app.use(express.json());

// GET the entire collection, send it back as JSON data
app.get("/api", async function(req,res)
{
  // acknowledge request received on the console for debugging
  console.log("GET COLLECTION REQUEST RECEIVED");
  
  // get the data to be sent back 
  const data = 
    await db.all("SELECT rowid as id, title, release_year, time_viewed FROM movies");
  
  // output data to console for debugging
  console.log(JSON.stringify(data));

  // send back table data as JSON data
  res.json(data);
});

// GET the entire collection of the given ID, send it back as JSON data
app.get("/api/:id", async function(req,res)
{
  // acknowledge request received on the console for debugging
  console.log("GET COLLECTION REQUEST RECEIVED FOR AN ID");
  console.log("Id: " + req.params.id);
  // get the data to be sent back 
  const data = 
    await db.all("SELECT rowid as id, title, release_year, time_viewed FROM movies WHERE rowid =?",[req.params.id]);
  
  // output data to console for debugging
  console.log(JSON.stringify(data));

  // send back table data as JSON data
  res.json(data);
});

//POST a new item to the collection
app.post("/api", async function(req,res){
    // acknowledge request received on the console for debugging
    console.log("POST REQUEST RECEIVED");
    console.log(req.body);

    const data = 
        await db.run("INSERT INTO movies VALUES (?,?,?)",
         [req.body.title, req.body.release_year, req.body.time_viewed]);

    // output data to console for debugging
    console.log("CREATE ENTRY SUCCESSFUL");

    // send back table data as JSON data
    res.send("CREATE ENTRY SUCCESSFUL");
});

//PUT to the collection
app.put("/api", async function(req,res){
    console.log("PUT REQUEST RECEIVED");
    console.log(req.body);

    obj= req.body;
    num= Object.keys(obj).length;
    console.log("Length of data" + num );
    console.log("Req.body.title 1: " + req.body[0].title);

    const data = 
        await db.all("DELETE FROM movies");
    
    for(i =0 ; i< num; i++)
        var data1 = 
        await db.run("INSERT INTO movies VALUES (?,?,?)",
            [req.body[i].title, req.body[i].release_year, req.body[i].time_viewed]);
    

    console.log("REPLACE COLLECTION SUCCESSFUL");
    res.send("REPLACE COLLECTION SUCCESSFUL");
});

//PUT the item to the collection
app.put("/api/:id", async function(req,res)
{
  // acknowledge request received on the console for debugging
  console.log("PUT COLLECTION REQUEST RECEIVED FOR AN ID");
  console.log("Id: " + req.params.id);
  // get the data to be sent back 
  const data = 
    await db.run("UPDATE movies SET title=?, release_year=?, time_viewed=? WHERE rowid=?",
    [req.body.title, req.body.release_year, req.body.time_viewed, req.params.id]);
  
  // output data to console for debugging
  console.log("UPDATE ITEM SUCCESSFUL");

  // send back table data as JSON data
  res.send("UPDATE ITEM SUCCESSFUL");
});

//DELETE the collection
app.delete("/api", async function(req, res){
    console.log("DELETE REQUEST RECEIVED");
    console.log(req.body);

    const data = 
        await db.all("DELETE FROM movies");

    console.log("DELETE COLLECTION SUCCESSFUL");
    res.send("DELETE COLLECTION SUCCESSFUL");
});

//DELETE the item from the collection
app.delete("/api/:id", async function(req,res)
{
  // acknowledge request received on the console for debugging
  console.log("DELETE COLLECTION REQUEST RECEIVED FOR AN ID");
  console.log("Id: " + req.params.id);
  // get the data to be sent back 
  const data = 
    await db.run("DELETE FROM movies WHERE rowid=?",
    [ req.params.id]);
  
  // output data to console for debugging
  console.log("DELETE ITEM SUCCESSFUL");

  // send back table data as JSON data
  res.json(req.body);
});

async function mytable(){

  //Creating a database
  db = await sqlite.open({
       filename: 'api.db',
       driver: sqlite3.Database
    });

  // Drop the table if alreaduy exist else create a table
  await db.run("DROP TABLE IF EXISTS movies");
  await db.run("CREATE TABLE movies (title TEXT, release_year TEXT, time_viewed TEXT)");                              
  

  const server= app.listen(3000, function(req, res){
  console.log("Server Listening at port 3000");
  });

}

mytable();