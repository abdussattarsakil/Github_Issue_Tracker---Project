console.log("connected....");

const loadData = () => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
    fetch(url)
        .then(res => res.json())
        .then(json => displayLoadData(json.data))
}


const displayLoadData = (data) => {
    //console.log(data)
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ``;

    data.forEach(info => {
        //console.log(info);

        const div = document.createElement("div");

        div.innerHTML = `
          
            <div class=" bg-slate-50 shadow-lg p-6 h-full">
                <div class="flex justify-between">
                    <img src="assets/Open-Status.png">
                    <p class="text-red-500 bg-red-300 px-5 rounded-xl">HIGH</p>
                </div>
                <h1 class="mt-2 font-semibold text-sm">${info.title}</h1>
                <h3 class="my-2 text-[12px] text-[#64748B]">
                ${info.description}</h3>
                <div class="flex gap-3">
                    <p>${info.labels[0]}</p>
                    <P>${info.labels[1]}</P>
                </div>
                <div class="card-divider"></div>
                <p class="text-[12px] text-[#64748B] my-2">#1 by<span>
                ${info.author}</span></p>
                <p class="text-[12px] text-[#64748B]">${info.createdAt.split("T")[0]}</p>
            </div>
        
        `

        cardContainer.append(div)
    });
}








loadData();