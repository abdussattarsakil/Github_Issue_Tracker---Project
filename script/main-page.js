console.log("connected....");

const all = [];
const open = [];
const closed = [];

const loadData = () => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`
    fetch(url)
        .then(res => res.json())
        .then(json => displayLoadData(json.data))
}

//btn toggling  
const btn = (btnStatus) => {
    //console.log(btnStatus)
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ``;

    let allCard = []

    const allBtn = document.getElementById("allBtn")
    const openBtn = document.getElementById("openBtn")
    const closedBtn = document.getElementById("closedBtn")

    allBtn.classList.remove("btn-primary")
    openBtn.classList.remove("btn-primary")
    closedBtn.classList.remove("btn-primary")

    if (btnStatus == "all") {

        allCard = all
        //console.log(allCard)
        allBtn.classList.add("btn-primary")

    }

    if (btnStatus == "open") {

        allCard = open
        //console.log(allCard)
        openBtn.classList.add("btn-primary")

    }

    if (btnStatus == "closed") {

        allCard = closed
        //console.log(allCard)
        closedBtn.classList.add("btn-primary")

    }

    allCard.forEach(card => {
        cardContainer.append(card)
    });
}


const displayLoadData = (data) => {
    //console.log(data)
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ``;

    data.forEach(info => {
        //console.log(info);

        const div = document.createElement("div");

        div.innerHTML = `
          
            <div id="card" class=" bg-slate-50 shadow-lg p-6 h-full">
                <div class="flex justify-between">
                    <img src="assets/${info.status}-Status.png">
                    ${info.priority == "high" ? ` <p class="font-medium text-[12px] text-red-500 bg-red-100 px-4 py-1 rounded-xl">HIGH</p> ` : ""}

                    ${info.priority == "medium" ? ` <p class="font-medium text-[12px] text-yellow-600 bg-yellow-100 px-4 py-1 rounded-xl">MEDIUM</p> ` : ""}

                    ${info.priority == "low" ? ` <p class="font-medium text-[12px] text-gray-600 bg-gray-200 px-4 py-1 rounded-xl">LOW</p> ` : ""}
                </div>


                <h1 class="mt-2 font-semibold text-sm">${info.title}</h1>
                <h3 class="my-2 text-[12px] text-[#64748B]">
                ${info.description}</h3>
                <div class="flex gap-1 lg:gap-3">
                    ${info.labels[0] == "bug" ? `<p class="text-red-500 text-[12px] border border-red-200 px-3 font-medium rounded-full py-1 bg-red-50" ><i class="fa-solid fa-bug"></i> BUG</p>` : ""}

                    ${info.labels[0] == "enhancement" ? `<p class="text-green-500 text-[12px] border border-green-200 px-3 font-medium rounded-full py-1 bg-green-50" ><i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT</p>` : ""}

                    ${info.labels[0] == "documentation" ? `<p class="text-blue-500 text-[12px] border border-blue-200 px-3 font-medium rounded-full py-1 bg-blue-50" ><i class="fa-brands fa-readme"></i>  DOCUMENTATION</p>` : ""}
                    

                    ${info.labels[1] ? `<P class="text-yellow-600 text-[12px] border border-yellow-200 px-3 font-medium rounded-full py-1 bg-yellow-50"><i class="fa-solid fa-life-ring"></i> HELP WANTED</P>` : ""}
                </div>
                <div class="card-divider"></div>
                <p class="text-[12px] text-[#64748B] my-2">#1 by<span>
                ${info.author}</span></p>
                <p class="text-[12px] text-[#64748B]">${info.createdAt.split("T")[0]}</p>
            </div>
        
        `
        // card er top border add 
        info.status == "open" ? div.classList.add("border-t-4", "border-green-500", "rounded-xl") : div.classList.add("border-t-4", "border-red-500", "rounded-xl")

        cardContainer.append(div)
        all.push(div)
        info.status == "open" ? open.push(div) : closed.push(div)
    });

}

loadData();
console.log(all, open, closed);
