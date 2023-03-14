let logf = document.getElementById("login-form");
const Dobinput = document.getElementById('dob');

Dobinput.addEventListener('input', (event) => {
    const dob = new Date(event.target.value);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();

    if (age < 18 || age > 55) {
        Dobinput.setCustomValidity('Please enter a valid date of birth between ages 18 and 55.');
    }
    else{
        Dobinput.setCustomValidity('');
    }
});

const getfigure = ()=>{
    let figure = localStorage.getItem("user-figures");
    if(figure){
        figure = JSON.parse(figure);
    }
    else{
        figure = [];
    } 
    return figure;
}
let material = getfigure();

const showfigure =()=>{
    const figure = getfigure();
    const tableentries = figure.map((entry)=>{
        const nameCell = `<td>${entry.ne}</td>`;
        const emailCell = `<td>${entry.el}</td>`;
        const passwordCell = `<td>${entry.passw}</td>`;
        const dobCell = `<td>${entry.db}</td>`;
        const acceptTermsCell = `<td>${entry.check}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const tab = 
    `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>dob</th>
            <th>Accepted terms?</th>
        </tr>${tableentries}
    </table>`;

    let ffigure = document.getElementById("user-figures");
    ffigure.innerHTML = tab;
}
const saveform = (event)=>{
    event.preventDefault();
    const ne = document.getElementById("name").value; 
    const el = document.getElementById("email").value;
    const passw = document.getElementById("password").value;
    const db = document.getElementById("dob").value;
    const check = document.getElementById("acceptTerms").checked;
    const entry = {
        ne,
        el,
        passw,
        db,
        check
    }
    material.push(entry);
    localStorage.setItem("user-figures",JSON.stringify(material));
    showfigure();
}

logf.addEventListener("submit",saveform); 

showfigure();
