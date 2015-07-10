angular.module("MetProc").service("datastore", function(){
    //the tokens for the items and the itemlist are made of the same alphanumerical characters but only the itemlist token contains single quotes
    var itemtok = ["password"];
    var tok = ["'password'"]; 
    
    var tasklist = [{nature: "stannis",description: "I am one task", position: 0, type: "list", token: tok[0]}, {nature: "stannis", description: "You are another task", position: 1, type: "list", token: tok[0]}];
    var tasknumber = [0];
    var deldataset = []; //stores the the uuids and the types to use them when deleting the outdated list in the cloud

    
    return{
        
        getToken: function(){
            return tok[0];
        },
        getItemToken: function(){
            return itemtok[0];
        },
        
        injectToken: function(tokenval){
            tok.splice(0);
            tok.push(tokenval);
            
            var temp = "";
            for(var i = 0; i < tokenval.length; ++i){
                if(tokenval[i] != "'"){
                    temp = temp + tokenval[i];
                }
            }

            itemtok.splice(0);
            itemtok.push(temp);
        },
        
        replace: function(dataset){
            var datas = dataset.concat();
            dataset = dataset.splice();
            for(var i = 0; i < datas.length;++i){
                tasklist[i] = datas[i];
            }
        },
        
        //For each task in the array, the strip function strips/removes the created, modified, description, nature and position properties - the resultant array can later be used right before data pushing to delete existing records on the cloud - before pushing the new list
        strip: function(rawdata1){
            var rawdata1 = rawdata1.concat();            
            for(var i = 0; i < rawdata1.length; ++i){
                delete rawdata1[i].created;
                delete rawdata1[i].modified;
                delete rawdata1[i].metadata;
                delete rawdata1[i].description;
                delete rawdata1[i].position;
            }
            
            deldataset = rawdata1.concat();
        },
        
        getStrip: function(){
            return deldataset;
        },
        
        addTask: function(value){
            tasknumber[0] = tasknumber[0] + 1;
            tasklist.push({
                description: value,
                nature: "stannis",
                type: "lists",
                token: itemtok[0],
                position: tasklist.length
            });
        },
        seeAll: function(){
            return tasklist;
        },
        del: function(itemposition){   
            //gets a list of the items
            var itemlist = tasklist.map(function(item){ return item.position});
            //gets the index position of the item you want
            var realindex = itemlist.indexOf(itemposition);
            //removes the item at that index position
            tasklist.splice(realindex, 1);
        },
        setasknumber: function(value){
            tasknumber[0] = value;
        },
        getasknumber: function(){
            return tasknumber;
        },
        getchosentask: function(itemposition){
            //gets a list of the items
            var itemlist = tasklist.map(function(item){ return item.position});
            //gets the index position of the item you want
            var realindex = itemlist.indexOf(itemposition);
            return tasklist[realindex].description;
        },
        edit: function(item, itemposition){
            //gets a list of the items
            var itemlist = tasklist.map(function(item){ return item.position});
            //gets the index position of the item you want and assigns the new description to the item in that position
            var realindex = itemlist.indexOf(itemposition);
            tasklist[realindex].description = item;
        }
        
    }
});
