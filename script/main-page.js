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
                    <p class="text-red-500 bg-red-100 px-5 rounded-xl">${info.priority}</p>
                </div>
                <h1 class="mt-2 font-semibold text-sm">${info.title}</h1>
                <h3 class="my-2 text-[12px] text-[#64748B]">
                ${info.description}</h3>
                <div class="flex gap-1 lg:gap-3">
                    ${info.labels[0]=="bug"?`<p class="text-red-500 text-[12px] border border-red-200 px-3 font-medium rounded-full py-1 bg-red-50" ><i class="fa-solid fa-bug"></i> BUG</p>`:""}

                    ${info.labels[0]=="enhancement"?`<p class="text-green-500 text-[12px] border border-green-200 px-3 font-medium rounded-full py-1 bg-green-50" ><i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT</p>`:""}

                    ${info.labels[0]=="documentation"?`<p class="text-blue-500 text-[12px] border border-blue-200 px-3 font-medium rounded-full py-1 bg-blue-50" ><i class="fa-brands fa-readme"></i>  DOCUMENTATION</p>`:""}
                    

                    ${info.labels[1]?`<P class="text-yellow-600 text-[12px] border border-yellow-200 px-3 font-medium rounded-full py-1 bg-yellow-50"><i class="fa-solid fa-life-ring"></i> HELP WANTED</P>`:""}
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