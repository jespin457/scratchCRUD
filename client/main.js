function attemptSignUp() {
  document.getElementById("register-response").innerHTML = 'Registering...';

  if (
    !document.getElementById("regEmail").value ||
    !document.getElementById("regUsername").value ||
    !document.getElementById("regPassword").value
  ) {
    document.getElementById("register-response").innerHTML = 'Error! Parameter(s) null.';
    return;
  }
  const newEmail = document.getElementById("regEmail").value;
  const newUsername = document.getElementById("regUsername").value;
  const newPassword= document.getElementById("regPassword").value;

  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: newEmail, username: newUsername, password: newPassword}),
  })
  .then(res => res.json())
  .then(signupRes => {
    if (signupRes.username) {
      document.getElementById("register-response").innerHTML = `Successfully registered ${signupRes.username}`;
    } else {
      console.log(signupRes);
      document.getElementById("register-response").innerHTML = 'Error occured! Try again.';
    }
  })
}

function attemptSignIn() {
  //if user registered just now, remove the register notif
  document.getElementById("register-response").innerHTML = '';
  document.getElementById("signin-response").innerHTML = `Signing in...`;
  
  if (!document.getElementById("signinUsername").value || !document.getElementById("signinPassword").value) {
    document.getElementById("signin-response").innerHTML = 'Error occured! Parameter(s) null.';
    return;
  }

  const username = document.getElementById("signinUsername").value;
  const password = document.getElementById("signinPassword").value;

  fetch(`/api/signin?username=${username}&password=${password}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(signinRes => {
    if (signinRes._id) {
      document.getElementById("signin-response").innerHTML = `Welcome, ${signinRes.username}.`;
      getNotes();
    } else {
      document.getElementById("signin-response").innerHTML = 'Error occured! Invalid credentials.';
    }
  })
}

function getNotes() {
  //Removes all notes before getting notes in order to prevent making copies of all notes each sign in
  const notesContainer = document.getElementById("notes");
  while (notesContainer.firstChild) {
    notesContainer.removeChild(notesContainer.lastChild);
  }

  const cookiesSplit = document.cookie.split(';')
  const user_id = Number(cookiesSplit[0][8]);
  
  fetch(`/api/getNotes/${user_id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(notes => {
    notes.forEach(note => {
      let list_item = document.createElement("li");
      let message = document.createTextNode(`${note.message} [Note ID: ${note._id}]`);
      list_item.appendChild(message);
      list_item.id = `note_id${note._id}`;
      document.getElementById("notes").appendChild(list_item);
    });
  })
}

function postNote() {
   if (!document.getElementById("noteToAdd").value || document.cookie.length === 0) {
    document.getElementById("postNote-response").innerHTML = 'Error occured! Not signed in and/or parameter(s) null';
    return;
  }

  const message = document.getElementById("noteToAdd").value;
  const cookiesSplit = document.cookie.split(';')
  const user_id = Number(cookiesSplit[0][8]);

  fetch('/api/postNote', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message: message, user_id: user_id}),
  })
  .then(res => res.json())
  .then(postNoteRes => {
    console.log(postNoteRes);
    if (postNoteRes.message) {
      document.getElementById("postNote-response").innerHTML = '';
      let list_item = document.createElement("li");
      let message = document.createTextNode(`${postNoteRes.message} [Note ID: ${postNoteRes._id}]`);
      list_item.appendChild(message);
      list_item.id = `note_id${postNoteRes._id}`;
      document.getElementById("notes").appendChild(list_item);
    } else {
      document.getElementById("postNote-response").innerHTML = 'Error occured!';
    }
  })
}

function deleteNote() {
  if (!document.getElementById("noteToDelete").value || document.cookie.length === 0) {
    document.getElementById("deleteNote-response").innerHTML = 'Error occured! Not signed in and/or parameter(s) null.';
    return;
  }

  const note_id = document.getElementById("noteToDelete").value;

  fetch(`/api/deleteNote/${note_id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(deleteNoteRes => {
    if (deleteNoteRes._id) {
      document.getElementById(`note_id${deleteNoteRes._id}`).remove();
    } else {
      document.getElementById("deleteNote-response").innerHTML = 'Error occured! Could find message with specified ID.';
    }
  })
}