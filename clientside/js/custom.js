async function Display() {
    const res= await fetch("http://localhost:3005/getdonors");
    const donors=await res.json();
    str=``;
    donors.map((donor)=>{  
        str+=` <div class="fromjs">
           <input type="text" name="name"   value=${donor.Name} id="name">
           <input type="text" name="email"  value=${donor.Email} id="email">
           <input type="text" name="phone"  value=${donor.Phone} id="phone">
           <input type="text" name="blood"  value=${donor.Blood} id="blood">
           <input type="text" name="gender" value=${donor.gender} id="gender">
           <button class="editbtn">Edit</button>
           <button class="savebtn">Save</button>
           <button class="deletebtn">Delete</button>
        </div>`
    });
    document.getElementById("container2").innerHTML=str;
}

Display();