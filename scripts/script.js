//------------------------------jQUERY------------------------------------------
$(document).ready(function() {

//-------------------FAQ PAGE------------------------

    $(".heroCont").animate({opacity: '1'}, 800, 'linear');
    $(".rDriver").delay(1300).animate({opacity: '1'}, 1000, 'linear');

//--------------------All h2-------------------------

    $('h2').animate({opacity: '1'});

//-------------------FAQ PAGE------------------------

    $(".dropdown").hover(function(){
        $(".dropUl").stop().slideToggle(100);
    });

//-------------------TEAM PAGE-----------------------

    $(".hmeet").hide()

    $(".teamBtn").click(function() {
        $(".hmeet").toggle('slow')
    });

});

//------------------------------jAVASCRIPT-------------------------------------
var myFolder = [] ;
var likedFolder =[] ;
var usrForm = [] ;
var usrComment = [] ;

//-----------------------PAGE LOAD FUNCTION-----------------------------

function myLoad() {
    //splits the current url pathname and gets the length
    let cur =  window.location.pathname;
    let ind = cur.split('/').length ;

    //if the page hasn't loaded before, create the session storage items
    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("savedItems", JSON.stringify(myFolder)) ;
        sessionStorage.setItem("likedItems", JSON.stringify(likedFolder)) ;
        sessionStorage.setItem("commentItems", JSON.stringify(usrComment)) ;
        sessionStorage.setItem("formSubmit", JSON.stringify(usrForm)) ;
        sessionStorage.setItem("hasCodeRunBefore", true) ;
    };
    //if the user is on the saved page
    if (cur.split('/')[ind-1] == 'saved.html') {
        myFolder = JSON.parse(sessionStorage.getItem('savedItems')) ;
        refreshSaveFolder() ;
        for (i = 0; i < myFolder.length ; i++) {
            //creating elements
            var mainDiv = document.getElementById('savedItems') ;
            var inDiv = document.createElement('div') ;
            let para = document.createElement('p') ;
            let anch = document.createElement('a') ;
            let delBtn = document.createElement('button') ;
            let hr = document.createElement('hr') ;
            //creating element attributes
            inDiv.setAttribute('class', 'itemDiv') ;
            delBtn.innerHTML = "Delete" ;
            delBtn.setAttribute('id', myFolder[i].name) ;
            delBtn.setAttribute('onclick', "deleteSaved(this)") ;
            delBtn.setAttribute('class', "delSavedBtn") ;
            delBtn.setAttribute('title', "Remove the item " + "'" + myFolder[i].name + "'" + " from your saved folder.") ;
            anch.setAttribute('href', myFolder[i].dir) ;
            //appending elements
            anch.innerHTML = myFolder[i].name ;
            para.appendChild(anch) ;

            inDiv.appendChild(delBtn) ;
            inDiv.appendChild(para) ;
            inDiv.appendChild(hr) ;

            mainDiv.appendChild(inDiv) ;
        }
    }
    //if the user is on the faq page
    if (cur.split('/')[ind-1] == 'faq.html') {
        usrComment = JSON.parse(sessionStorage.getItem('commentItems')) ;
        for (i = 0; i < usrComment.length ; i++) {
            //creating elements
            let name = document.createElement('p') ;
            var mainDiv = document.getElementById('commentSection') ;
            var rowDiv = document.createElement('div') ;
            var colDivPic = document.createElement('div') ;
            var colDivCom = document.createElement('div') ;
            let para = document.createElement('p') ;
            let pp = document.createElement('img') ;
            let hr = document.createElement('hr') ;

            //creating element attributes
            hr.setAttribute('class', 'del') ;
            name.setAttribute('style', 'font-weight:bold;') ;
            rowDiv.setAttribute('class', 'row user del') ;
            colDivPic.setAttribute('class', 'col-md-1 del') ;
            colDivCom.setAttribute('class', 'col-md-11 del') ;
            pp.setAttribute('src', '../img/usrIcon.png') ;
            pp.setAttribute('style', 'border:none;') ;

            //appending elements
            name.innerText = usrComment[i].name ;
            para.innerText = usrComment[i].comment ;
            colDivPic.appendChild(pp) ;
            colDivCom.appendChild(name) ;
            colDivCom.appendChild(para) ;
            rowDiv.appendChild(colDivPic) ;
            rowDiv.appendChild(colDivCom) ;
            mainDiv.appendChild(rowDiv) ;
            mainDiv.appendChild(hr) ;
        }
    }
};

//-------------------SAVE ITEM FUNCTION-----------------------

function saveItem(btn) {
    myFolder = JSON.parse(sessionStorage.getItem('savedItems')) ;
    let page = window.location.pathname ;
    var target = String(btn.parentNode.parentNode.id) ;
    let name = document.getElementById(target).getAttribute('name') ;
    var save = true ;

    //checks for duplicate save
    for (i=0; i < myFolder.length; i++) {
        if (myFolder[i].name == name) {
            alert("You've already entered added this to saved.") ;
            save = false ;
        };
    };
    if (save == true) {
        //returns "/pages/page.html#parentId"
        let link = page + "#" + target ; 
        //creates the new saved object
        let newSave = new Saved(
            name,
            link
        );
        myFolder.push(newSave) ;
        alert("You have " + myFolder.length + " items in your save for later folder.") ;
        sessionStorage.setItem('savedItems', JSON.stringify(myFolder)) ;
    }
}

//-------------------LIKE ITEM FUNCTION-----------------------

function likeItem(btn) {
    likedFolder = JSON.parse(sessionStorage.getItem('likedItems')) ;
    let page = window.location.pathname ;
    var target = String(btn.parentNode.parentNode.id) ;
    let name = document.getElementById(target).getAttribute('name') ;
    var like = true ;

    //checks if the user has that object in likedFolder
    for (i=0; i < likedFolder.length; i++) {
        if (likedFolder[i].name == name) {
            alert("You've already liked this item.") ;
            like = false ;
        }
    }
    if (like == true) {
        //returns "/pages/page.html#parentId"
        let link = page + "#" + target ; 
        //creates the new liked object
        let newLike = new Liked(
            name,
            link
        );
        likedFolder.push(newLike) ;
        sessionStorage.setItem('likedItems', JSON.stringify(likedFolder)) ;
    }
}

//-----------------SUBMIT FORM FUNCTION----------------------

function submitForm() {
    usrForm = JSON.parse(sessionStorage.getItem('formSubmit')) ;
    let email = document.getElementById('inputEmail3').value ;
    let name = document.getElementById('inputName3').value ;
    let wantLetter = document.getElementById('newsletter').checked ;
    let reason = '' ;
    let cont = true
    //changes cont to false if either of the fields are empty
    if (document.getElementById('inputEmail3').value == '' || document.getElementById('inputName3').value == '') {
        alert('Please fill all both fields before submitting!')
        cont = false ;
    };
    //continues if both input fields are filled
    if (cont == true) {
        //checks which option was selected
        if (document.getElementById('gridRadios1').checked) {
            reason = 'wantRace' ;
        }else if (document.getElementById('gridRadios2').checked) {
            reason = 'curious' ;
        }
        let newSubmit = new Submission(
            email,
            name,
            reason,
            wantLetter
        );
        usrForm.push(newSubmit) ;
        sessionStorage.setItem("formSubmit", JSON.stringify(usrForm)) ;
        alert('Thank you ' + name.split(" ")[0] + "! Your form has been successfully submitted!") ;
    };
    
}

//-----------------SUBMIT COMMENT FUNCTION----------------------

function submitComment() {
    usrComment = JSON.parse(sessionStorage.getItem("commentItems")) ;
    var name = document.getElementById('displayName').value ;
    var comment = document.getElementById('comments').value ;
    let cont = true
    //changes cont to false if either of the fields are empty
    if (document.getElementById('comments').value == '' || document.getElementById('displayName').value == '') {
        alert('Please enter a display name aswell as a comment before submitting!')
        cont = false ;
    }
    if (cont == true) {
        let newComment = new Comment(
            name,
            comment
        );
        usrComment.push(newComment) ;
        sessionStorage.setItem("commentItems", JSON.stringify(usrComment)) ;
        //removes all divs in commentArea
        $('.del').remove();
        myLoad() ;
    };
    //clears the input fields
    document.getElementById('displayName').value = '' ;
    document.getElementById('comments').value = '' ;
}

//-----------------------CONSTRUCTORS-----------------------

//COMMENT OBJECT CONSTRUCTOR
function Comment(name, comment) {
    this.name = name ;
    this.comment = comment ;
};

//SAVE OBJECT CONSTRUCTOR
function Saved(name, dir) {
    this.name = name ;
    this.dir = dir ;
};

//LIKE OBJECT CONSTRUCTOR
function Liked(name, dir) {
    this.name = name ;
    this.dir = dir ;
};

//CONTACT FORM OBJECT CONSTRUCTOR
function Submission(email, name, reason, wantLetter) {
    this.email = email ;
    this.name = name ;
    this.reason = reason ;
    this.wantLetter = wantLetter ;
};

//-----------------DELETE SAVED FUNCTION----------------------

//function that deletes a saved object from the array and storage
function deleteSaved(clicked_id) {
    myFolder = JSON.parse(sessionStorage.getItem("savedItems")) ;
    //removes the buttons parent and removes object from array
    clicked_id.parentNode.remove() ;
    myFolder.splice(clicked_id,1) ;

    sessionStorage.setItem("savedItems", JSON.stringify(myFolder)) ;
    refreshSaveFolder() ;
    
}

//-----------------USER FOLDER REFRESH FUNCTION----------------------

//displays "You have not saved anything yet" if folder is empty
function refreshSaveFolder() {
    if(myFolder.length == 0) {
        //tag creation & editing
        let mainDiv = document.getElementById('savedItems') ;
        let inDiv = document.createElement('div') ;
        let para = document.createElement('p') ;
        para.setAttribute('style', 'font-style: italic; color: gray;')
        let hr = document.createElement('hr') ;
        para.innerText = "You have not saved anything yet" ;
        //appends elements
        inDiv.appendChild(para) ;
        inDiv.appendChild(hr) ;
        mainDiv.appendChild(inDiv) ;
    }
}

//--------------------------------------------------------------------