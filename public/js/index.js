
console.log("Page loaded");

const submitPost = $("#submit");
<<<<<<< HEAD
let validImg = false;


=======
const imageUrl = $("#image-url").val();
const validImg = false;

// if (imageUrl.endsWith(".jpg" || imageUrl.includes(".png"))) {
//     validImg === true;
//     submitPost.removeAttr("disabled");

// } else {
//     validImg === false;
//     $("image-url").css("border-color","red")
// };
>>>>>>> 91fad5f5b331563785389641e2499f1e02c924c1

const formSubmit = function(event) {
    event.preventDefault();
    console.log("button clicked");

    const imageUrl = $("#image-url").val().trim();
    console.log("url <", imageUrl, ">", imageUrl === "");
    if (imageUrl.endsWith(".jpg") || imageUrl.includes(".png") || imageUrl === "") {
        validImg = true;

        // $("#image-url").removeAttr("invalid");
        document.getElementById("image-url").setCustomValidity('')
    } else {
        document.getElementById("image-url").setCustomValidity('file should end in .jpg or .png')
        // $("#image-url").attr("invalid", true);
        validImg = false;
    };
    console.log(validImg);

    this.classList.remove('was-validated');
    if (this.checkValidity() === false || !validImg){
        console.log("invalid");
        this.classList.add('was-validated');
        return false;      
    }

    let newFavor = {
        title: $("#itemname").val().trim(),
        imageURL: $("#image-url").val().trim(),
        body: $("#msg").val()
    }

    $.ajax("/api/newFavor", {
        type: "POST",
        data: newFavor
    }).then(
        function (req, res) {
            // Reload the page to get the updated list
            // location.reload();
            location.assign("/get");
        }
    );

}


$('#postForm').submit(formSubmit);