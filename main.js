const body = document.querySelector("body");
const navBar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".close-btn");

const section_main = document.querySelectorAll(".main");
const accept_terms = document.querySelector(".accept_terms");

const box_btn = document.querySelector('.box_btn');
const btn_accept_term = document.querySelector(".btn_accept_term");
const btn_refused_term = document.querySelector(".btn_refused_term");
const message_refused = document.querySelector(".message_refused");
const _message = document.querySelector("._message");

const zap_btn = document.querySelector('.zap-btn');
const zap_btn2 = document.querySelector('.zap-btn2');

window.addEventListener('load', function () {
  navBar.style.display = 'none';
  zap_btn.style.display = 'none';
  section_main.forEach(element => {
    element.style.display = 'none';
  });
})

const fn_zap = function () {
  fetch('./colaborator_number.txt')
    .then(response => response.text())
    .then((data) => {
      const numbers = data.split(',');
      const total_numbers = numbers.length;
      const random_position = Math.floor(Math.random() * total_numbers);
      const selected_number = numbers[random_position] || numbers[0];
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const text = `Boas-vindas a Heineken! O que eu posso fazer por você hoje?`
      window.location.href = `https://api.whatsapp.com/send?phone=55${params.numbers || selected_number}&text=${encodeURIComponent(text)}`;
    })

};

zap_btn.onclick = fn_zap;
zap_btn2.onclick = fn_zap;

btn_accept_term.onclick = function () {
  navBar.style.display = 'flex';
  accept_terms.style.display = 'none';
  zap_btn.style.display = 'block';
  section_main.forEach(element => {
    element.style.display = 'flex';
  });
};

btn_refused_term.onclick = function () {
  _message.style.display = 'none';
  box_btn.style.display = 'none';
  message_refused.style.display = 'block';
};

menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
};

cancelBtn.onclick = function () {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
};

let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}
