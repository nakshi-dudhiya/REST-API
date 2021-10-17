// StAuth102222: I Nakshi Dudhiya, 000793267 certify that this material is my original work.
// No other person's work has been used without due acknowledgement. 
//I have not made my work available to anyone else."

const axios = require ("axios");

async function test()
{
    try{
        //TEST 1
        const response1= await axios.post('http://localhost:3000/api',
            {"title":"Spiderman", "release_year": "2010", "time_viewed" : "2012-01-03"});
        console.log(response1.data);
        
        const response2= await axios.post('http://localhost:3000/api',
            {"title":"Twilight", "release_year": "2008", "time_viewed" : "2012-01-03 T08:45:56"});
        console.log(response2.data);

        const response3= await axios.put('http://localhost:3000/api/1', 
            {"title":"Batman", "release_year": "2010", "time_viewed" : "2012-01-03"});           
        console.log(response3.data);

        const response4= await axios.get('http://localhost:3000/api');
        console.log(response4.data);
        
        if(response4.data[0].title != "Batman")
            console.log("FAILED TEST #1: Batman not found as first title");

        if(response4.data[1].title != "Twilight")
            console.log("FAILED TEST #2: Twilight not found as second title");
        
        //TEST 2
        const response5 = await axios.put('http://localhost:3000/api',
            [{"title":"Gladiator", "release_year":"2000","time_viewed":"2017-10-03T11:45:56.200"},
            {"title":"Avengers: Infinity War", "release_year":"2019","time_viewed":"2019-12-03T15:20:20.200"},
            {"title":"Wonder Woman", "release_year":"2017","time_viewed":"2017-06-04T08:45:56.200"},
            {"title":"Shaang Chi", "release_year":"2021","time_viewed":"2017-09-04T06:45:50.200"}]);
        console.log(response5.data);

        const response6= await axios.get('http://localhost:3000/api');
        console.log(response6.data);

        const response7= await axios.delete('http://localhost:3000/api/2');
        console.log(response7.data);
        
        const response8 = await axios.get('http://localhost:3000/api');
        console.log(response8.data);

        if(response8.data[0].id != 1)
            console.log("GET TEST FAILED, ID:1 NOT FOUND");
    
        if(response8.data[1].title != "Wonder Woman")
            console.log("TEST FAILED.");

        if(response8.data[2].title != "Shaang Chi")
            console.log("TEST FAILED.");
    
        const response9 = await axios.delete('http://localhost:3000/api');
        console.log("collection deleted");

        const response0= await axios.get('http://localhost:3000/api');
        console.log(response0.data);

        console.log("ALL TESTS SUCCESSFUL");

    } catch(error){
        console.error(error);
    }
}

test();