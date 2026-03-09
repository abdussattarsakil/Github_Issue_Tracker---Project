console.log("connected");

const loadData = () => {
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues`
    fetch(url)
    .then(res=>res.json())
    .then(json=>displayLoadData(json.data))
}


const displayLoadData=(data)=>{
    //console.log(data)
    const cardContainer=document.getElementById("card-container")
    cardContainer.innerHTML=``;

    data.forEach(info => {
        console.log(info);
        
        const div=document.createElement("div")
        div.innerHTML=`
        
        `
        cardContainer.append(div)
    });
}








loadData();