// Toggle Navigation
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigation = document.querySelector(".navigation");

hamburgerMenu.addEventListener("click", () => {
  navigation.classList.toggle("open");
});

// Switch Between Skills and Experience
// Wrapper
const programmingSkills = document.querySelector("#programming");
const editingSkills = document.querySelector("#editing");
const experiencesSkills = document.querySelector("#experiences");

// Buttons
const skillsBtns = document.querySelectorAll(".skills__btn");
const skillsBtn = document.querySelector("#skills-btn");
const skillsListWrapper = document.querySelector(".skills__btn-lists");
const skillsListBtns = document.querySelectorAll(".skills__btn-list");
const programmingBtn = document.querySelector("#programming-btn");
const editingBtn = document.querySelector("#editing-btn");
const experiencesBtn = document.querySelector("#experiences-btn");

skillsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    skillsBtns.forEach((btn) => {
      btn.classList.remove("btn-active");
    });
    btn.classList.add("btn-active");

    if (btn.id === "skills-btn") {
      skillsListWrapper.style.display = "flex";
      programmingSkills.style.display = "flex";
      editingSkills.style.display = "none";
      experiencesSkills.style.display = "none";
      programmingBtn.classList.add("list-active");
      editingBtn.classList.remove("list-active");

      document.querySelector(".skills__btn i").style.color = "white";
    } else {
      skillsListWrapper.style.display = "none";
      programmingSkills.style.display = "none";
      editingSkills.style.display = "none";
      experiencesSkills.style.display = "flex";

      document.querySelector(".skills__btn i").style.color = "var(--black)";
    }
  });
});

skillsListBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    skillsListBtns.forEach((btn) => {
      btn.classList.remove("list-active");
    });
    btn.classList.add("list-active");

    if (btn.id === "programming-btn") {
      programmingSkills.style.display = "flex";
      editingSkills.style.display = "none";
      experiencesSkills.style.display = "none";
    } else if (btn.id === "editing-btn") {
      programmingSkills.style.display = "none";
      editingSkills.style.display = "flex";
      experiencesSkills.style.display = "none";
    }
  });
});
