function validateForm(){
    var username = document.getElementById("userName").value;
    var userlast = document.getElementById("userLastName").value;
    var email = document.getElementById("email").value;
    var passwd = document.getElementById("passwd").value;
    var passwdConf = document.getElementById("passwdConf").value;
    
    if(username == "" || userlast == "" || email == "" || passwd == "" || passwdConf == ""){
        alert("Uzupełnij brakujące pola");
        return false;
    }

    if(passwd != passwdConf){
        alert("Hasła różnią się!");
        return false;
    }

    var emailPatt = /\S+@\S+\.\S+/;
    if (!emailPatt.test(email)){
        alert("Niepoprawny adres email!");
        return false;
    }

    return true;
}

function toLogin(){
    var myRegister = document.getElementById("register-form");
    var myLogin = document.getElementById("login-form");

    myLogin.style.display = 'block';
    myRegister.style.display = 'none';
}

function toRegister(){
    var myRegister = document.getElementById("register-form");
    var myLogin = document.getElementById("login-form");

    myLogin.style.display = 'none';
    myRegister.style.display = 'block';
}

const { MongoClient } = require('mongodb');

async function main(){
    const uri = "mongodb+srv://mrozworska:zaq1%40WSX@cluster0.q6xd2t0.mongodb.net/";

    const client = new MongoClient(uri);

    try{
        await client.connect();

        await listDatabases(client);
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }

}

main().catch(console.error);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:")
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}

