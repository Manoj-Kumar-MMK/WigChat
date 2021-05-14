

export function outputMessage(data) {
    let username = data.username ;
    let time = data.time ;
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = username;
    p.innerHTML += `<span>${time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = data.message;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }

export function getId (){

    let myid = localStorage.getItem("myid");
    let fid = localStorage.getItem("fid");

    return {myid , fid} ; 
}