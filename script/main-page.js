console.log("connected....");

const all = [];
const open = [];
const closed = [];

const issueNum = document.getElementById("issueNum")


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

        issuesNum = issueNum.innerHTML = `${allCard.length}`

    }

    if (btnStatus == "open") {

        allCard = open
        console.log(open.length)
        openBtn.classList.add("btn-primary")

        issueNum.innerHTML = `${allCard.length}`

    }

    if (btnStatus == "closed") {

        allCard = closed
        //console.log(allCard)
        closedBtn.classList.add("btn-primary")
        console.log(allCard.length);

        issueNum.innerHTML = `${allCard.length}`

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
          
            <div onclick="loadCardDetail(${info.id})" id="card" class=" bg-slate-50 shadow-lg p-6 h-full">
                <div class="flex justify-between">
                    <img src="assets/${info.status}-Status.png">
                    ${info.priority == "high" ? ` <p class="font-medium text-[12px] text-red-500 bg-red-100 px-4 py-1 rounded-xl">HIGH</p> ` : ""}

                    ${info.priority == "medium" ? ` <p class="font-medium text-[12px] text-yellow-600 bg-yellow-100 px-4 py-1 rounded-xl">MEDIUM</p> ` : ""}

                    ${info.priority == "low" ? ` <p class="font-medium text-[12px] text-gray-600 bg-gray-200 px-4 py-1 rounded-xl">LOW</p> ` : ""}
                </div>


                <h1 class="mt-2 font-semibold text-sm">${info.title}</h1>
                <h3 class="my-2 text-[12px] text-[#64748B]">
                ${info.description}</h3>
                <div class="flex gap-1 lg:gap-3 my-4">
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
        info.status == "open" ? div.classList.add("border-t-4", "border-green-500", "rounded-xl") : div.classList.add("border-t-4", "border-blue-500", "rounded-xl")

        cardContainer.append(div)
        all.push(div)
        info.status == "open" ? open.push(div) : closed.push(div)
    });

}

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

const loadCardDetail = (id) => {
    console.log(id)
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => displayModal(json.data))
}

const displayModal = (info) => {
    console.log(info)
    const modalContainer = document.getElementById("modalContainer")
    modalContainer.innerHTML = `
   <h1 class="mt-2 font-bold text-2xl text-[#1F2937] mb-2">${info.title}</h1>

        <div class="sm:flex gap-5 items-center">
           ${info.status == "open" ? ` <p class="font-medium text-[12px] text-white bg-green-400 px-3  py-1 rounded-xl w-fit">Opened</p> ` 
            :
            `<p class="font-medium text-[12px] text-white bg-red-400 px-4 py-1 rounded-xl w-fit">Closed</p>`}
            <p class="text-[12px] text-[#64748B]">Opened by <span>${info.author}</span></p>
 
            <p class="text-[12px] text-[#64748B]">${info.createdAt.split("T")[0]}</p>
        </div>

        <div class="flex gap-1 lg:gap-3 my-4">
            ${info.labels[0] == "bug" ? `<p class="text-red-500 text-[12px] border border-red-200 px-3 font-medium rounded-full py-1 bg-red-50" ><i class="fa-solid fa-bug"></i> BUG</p>` : ""}

            ${info.labels[0] == "enhancement" ? `<p class="text-green-500 text-[12px] border border-green-200 px-3 font-medium rounded-full py-1 bg-green-50" ><i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT</p>` : ""}

            ${info.labels[0] == "documentation" ? `<p class="text-blue-500 text-[12px] border border-blue-200 px-3 font-medium rounded-full py-1 bg-blue-50" ><i class="fa-brands fa-readme"></i>  DOCUMENTATION</p>` : ""}
                    

            ${info.labels[1] ? `<P class="text-yellow-600 text-[12px] border border-yellow-200 px-3 font-medium rounded-full py-1 bg-yellow-50"><i class="fa-solid fa-life-ring"></i> HELP WANTED</P>` : ""}
        </div>
            <h3 class="my-2 text-[14px] text-[#64748B] mb-4">
            ${info.description}</h3>

        <div class="grid grid-cols-2 bg-gray-100 shadow-lg p-4 rounded-lg">
            <div>
                <p class="text-gray-400">Assignee:</p>
                ${info.assignee==""?`<h2 class="font-semibold text-  [#1F2937]">"Name Not Found"</h2>`: `<h2 class="font-semibold text-[#1F2937]">${info.assignee}</h2>`}
               
            </div>
            <div >
                <p class="text-gray-400">Priority:</p>
                ${info.priority == "high" ? ` <p class="font-medium text-[12px] text-red-500 bg-red-100 px-4 py-1 rounded-xl w-fit">HIGH</p> ` : ""}

                ${info.priority == "medium" ? ` <p class="font-medium text-[12px] text-yellow-600 bg-yellow-100 px-4 py-1 rounded-xl w-fit">MEDIUM</p> ` : ""}

                ${info.priority == "low" ? ` <p class="font-medium text-[12px] text-gray-600 bg-gray-300 px-4 py-1 rounded-xl w-fit">LOW</p> ` : ""}
            </div>
        </div>
    
    `;

    document.getElementById("modal").showModal()
}



loadData();
//console.log(all, open, closed);
