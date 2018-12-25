import fetch from "../util/fetch-fill";
import URI from "urijs";


// /records endpoint
window.path = "http://localhost:3000/records";


var retdata = {};
var rdata={};
// Your retrieve function plus any additional functions go here ...


/*
 Upon a successful API response, transform the fetched payload into an object containing the following keys:

 **ids**: An array containing the ids of all items returned from the request.
  - **open**: An array containing all of the items returned from the request that have a `disposition` value of `"open"`. Add a fourth key to each item called `isPrimary` indicating whether or not the item contains a primary color (red, blue, or yellow).
  - **closedPrimaryCount**: The total number of items returned from the request that have a `disposition` value of `"closed"` and contain a primary color.
  - **previousPage**: The page number for the previous page of results, or `null` if this is the first page.
  - **nextPage**: The page number for the next page of results, or `null` if this is the last page.

5. Return a promise from `retrieve` that resolves with the transformed data.
{"previousPage":null,"nextPage":2,"ids":[1,2,3,4,5,6,7,8,9,10],"open":[{"id":2,"color":"yellow","disposition":"open","isPrimary":true},{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":8,"color":"green","disposition":"open","isPrimary":false},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":1};

*/
 

export const retrieve = (options) =>
{
    console.log("STARTING RETRIEVE with optons page  " + options.page +  "  colors "+options.colors);
    
    var colors;
    var ctr=0;
    var idnow=0;
    var closedPrimaryCount=0;
    var idArr=[];
    var openArr=[];
    const vals = {
                       method: "GET",
                       mode:"cors",
                       headers:{
                              
                             "Content-Type": "application/json"
                       } 
            }

    
   // var ks = Array.from(mMp.keys()).join(", ");
       var urlnow = window.path;
     
      
    if(options)
        
        {
             var cl = options.colors;
   
            if((typeof(options.page) !== 'undefined' && options.page)&& (typeof(options.colors) !== "undefined"))
                {
                     colors = cl.map(function(cl){return "&color[]="+cl});
     
                    urlnow = `${window.path}?limit=10&offset=${options.page* 10}${colors}`;
                }
            if((typeof(options.page)== 'undefined' || options.page)&& (typeof(options.colors) !== "undefined"))

                {
                    colors = cl.map(function(cl){return "&color[]="+cl});
                    urlnow = `${window.path}?limit=10&offset=0${colors}`;
                }
            if(typeof(options.colors)== "undefined")
                {
                    urlnow = `${window.path}?limit=10&offset=${options.page* 10}`;
                }


            if((typeof(options.page)== 'undefined' || options.page)&&(typeof(options.colors)== "undefined"))
                {
                    urlnow = `${window.path}?limit=10&offset=0`;
                }
        }
    
    
    
    /*
                {"previousPage":null,"nextPage":2,"ids":[1,2,3,4,5,6,7,8,9,10],"open":[{"id":2,"color":"yellow","disposition":"open","isPrimary":true},{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":8,"color":"green","disposition":"open","isPrimary":false},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":1};
                const descriptors1 = Object.getOwnPropertyDescriptors(object1);

console.log(descriptors1.property1.writable);
// expected output: true

console.log(descriptors1.property1.value);
// expected output: 42

            */
    
    

                    const Http = new XMLHttpRequest();
                  Http.open("GET", urlnow);
                    Http.send();
                    Http.onreadystatechange=(e)=>{
                     
                      
                             rdata = JSON.parse(Http.responseText);
                             
                           if(options.page > 1)
                               {
                                    retdata.previousPage= options.page -1;
                                    retdata.nextPage = options.page + 1;
                               }
                           else
                               {
                                   retdata.previousPage = null;
                                   retdata.nextPage = 2;
                               }
                            
                          
                             //idArr.push(rdata.map(dat=>parseInt(dat.id)));
                        rdata.map(function(dat){
                            
                            
                            idArr.push(dat.id);
                        
                        })
                          
                        
                           retdata.ids = idArr;
                        
                             rdata.filter(dt=>dt.disposition=="open").map(function(dat){
                                 var prim = false;
                                 if(dat.color == "red"  || dat.color == "blue" || dat.color == "green")
                                      prim = true;
                                 dat.isPrimary=prim;
                openArr.push("id:"+dat.id+","+"color:"+dat.color+","+"disposition:"+dat.disposition+","+"isPrimary:"+dat.isPrimary);
                             });
                        
                          retdata.open = openArr;
                        
               rdata.filter(function(dt){
                        if(dt.disposition=="closed" && (dt.color == "red"  || dt.color == "blue" || dt.color == "green"))
                            ctr++;
                        return ctr;
                    })
                        
                   
                           retdata.closedPrimaryCount = ctr;
                        
                        console.log(retdata);
                        
                        return retdata;
                        
                        
                            }
                            
                 
        
       
    
}



export default retrieve;
