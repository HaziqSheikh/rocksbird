class Comment {
  constructor(userName, userEmail, userComment) {
    this.name = userName;
    this.email = userEmail;
    this.comment = userComment;
  }
}

class UI {
  addComment(newComment) {
    let x = document.querySelector("#commentSection");
    let div = document.createElement("div");
    let data = `<div class="row">
        <div class="col">
          <div class="row">
            <div class="col-auto my-1">
              <img
                src="images/backgrounds/usericon.png"
                alt="profile pic"
              />
            </div>
            <div class="col-auto p-0">
              <h4 class="fs-5">
                ${newComment.name} <br />
                <span class="fs-6 fw-light text-muted"
                  >${newComment.email}</span
                >
              </h4>
            </div>
            <div class="col-auto ms-auto">
                  <div class="dropdown mt-1">
                    <button
                      class="btn btn-sm btn-secondary dropdown-toggle"
                      data-bs-toggle="dropdown"
                    ></button>
                    <ul class="dropdown-menu p-2">
                      <li
                        class="
                          dropdown-item
                          bg-primary
                          text-color text-center
                          rounded-pill
                          my-1
                        "
                        id="editbtn"
                        data-bs-target="#editModal"
                        data-bs-toggle="modal"
                      >
                        Edit
                      </li>
                      <li
                        class="
                          dropdown-item
                          bg-danger
                          text-color text-center
                          rounded-pill
                        "
                        id="deleteBtn"
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                </div>
          </div>
          <div class="row">
            <p>
              ${newComment.comment}
            </p>
          </div>
        </div>
      </div>
      <hr />`;
    div.innerHTML = data;
    x.appendChild(div);
    console.log("Hello");
  }
  validation(newComment) {
    if (newComment.name.length === 0) {
      let n = document.querySelector("#name");
      n.classList.add("is-invalid");
      n.classList.remove("is-valid");
      return false;
    } else {
      let n = document.querySelector("#name");
      n.classList.add("is-valid");
      n.classList.remove("is-invalid");
    }
    if (newComment.email.length === 0) {
      let e = document.querySelector("#email");
      e.classList.add("is-invalid");
      e.classList.remove("is-valid");
      return false;
    } else {
      let e = document.querySelector("#email");
      e.classList.add("is-valid");
      e.classList.remove("is-invalid");
    }
    if (newComment.comment.length === 0) {
      let c = document.querySelector("#commnent");
      c.classList.add("is-invalid");
      c.classList.remove("is-valid");
      return false;
    } else {
      let c = document.querySelector("#comment");
      c.classList.add("is-valid");
      c.classList.remove("is-invalid");
    }
    return true;
  }
}
let myModal = new bootstrap.Modal(document.getElementById("commentModal"));
document.querySelector("#addComment").addEventListener("click", (e) => {
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let comment = document.querySelector("#comment").value;
  let newComment = new Comment(name, email, comment);
  let ui = new UI();
  let valid = ui.validation(newComment);

  if (valid == true) {
    ui.addComment(newComment);
    myModal.hide();
    enableEditbtn();
    document.querySelector("#addcommentbtn").disabled = true;
  }
  console.log("Add comment button is running");
});

// ajax -------------------------------------
$("#loader").css("display", "none");

function beforeSend() {
  $("#loader").css("display", "block");
}
function onSuccess(data) {
  let comentSection = document.querySelector("#commentSection");
  for (let index = 0; index < data.length - 490; index++) {
    let comments = data[index];
    let div = document.createElement("div");
    let commentData = `<div class="row">
    <div class="col">
      <div class="row">
        <div class="col-auto my-1">
          <img
            src="images/backgrounds/usericon.png"
            alt="profile pic"
          />
        </div>
        <div class="col-auto p-0">
          <h4 class="fs-5">
            ${comments.name} <br />
            <span class="fs-6 fw-light text-muted"
              >${comments.email}</span
            >
          </h4>
        </div>
      </div>
      <div class="row">
        <p>
          ${comments.body}
        </p>
      </div>
    </div>
  </div>
  <hr />`;
    div.innerHTML = commentData;
    comentSection.appendChild(div);
  }
}
function onError() {
  console.log("There has been an error");
}

$("#loadComment").click((e) => {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/comments",
    beforeSend: beforeSend,
    success: onSuccess,
    eror: onError,
    complete: () => {
      $("#loader").css("display", "none");
    },
  });
  document.querySelector("#loadComment").disabled = true;
});

// edit button-------------------------------

function enableEditbtn() {
  document.querySelector("#editbtn").addEventListener("click", (e) => {
    let oldComment =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.children[1].outerText;
    document.getElementById("editedComment").value = oldComment;
    console.log("Edit button is active");
  });

  // delete button -----------------------------
  document.getElementById("deleteBtn").addEventListener("click", (e) => {
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
  });

  // confirm button -----------------------------

  document.getElementById("confirmbtn").addEventListener("click", (e) => {
    let newComment = document.getElementById("editedComment").value;

    document.querySelector(
      "#editbtn"
    ).parentElement.parentElement.parentElement.parentElement.parentElement.children[1].outerText =
      newComment;
  });
}
