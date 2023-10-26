// when the page is ready
// then run the callback function that I gave you
const server_url = "http://localhost:3001/bucket/"

$(document).ready(function(){
    fetch(server_url)
    .then(response => response.json())
    .then(data => {
        // data is an array of objects
        // each object is a bucketlist item
        // which has id, description, isCompleted properties
        $('ul').empty();
        // loop over the data array
        // and append to the ul
        data.forEach(item => {
            let completedStyleString = item.isComplete ? 'class="completed"' : '';
            $('ul').append(`
                <li 
                  data-id="${item.id || item._id}"
                  ${completedStyleString}
                > 
                  ${item.description}
                  <span>
                    <i class="fa-solid fa-delete-left"></i>
                  </span>
                </li>
            `)
        })
    })
    .catch(err => console.log(err))
});

// MARK COMPLETE - PUT
$('ul').on('click', "li", function(event){
    event.stopPropagation();
    let id = $(this).data('id');
    fetch(server_url + id, {method: "PUT"} )
    .then(()=>{
        $(this).toggleClass('completed');
    })
    .catch(err => console.log(err))
});

// DELETE - DELETE
$('ul').on('click', "span", function(event){
    // stop propagating this to higher ups
    event.stopPropagation();
    // get a handle on the id of the item that the user clicked
    let id = $(this).parent().data('id')
    // make a DELETE request to the server
    fetch(server_url + id, {method: "DELETE"})
    .then(() => {
        $(this).parent().remove();
    })
    .catch(err => console.log(err))
});

// CREATE - POST
$('input').keypress(function(event){
    if(event.which === 13 && $(this).val().trim()){
        let newItem = $(this).val().trim();
        // POST the backend with the data that the user typed
        fetch(server_url, 
        // options object
        {
            method: 'POST',
            body: JSON.stringify({description: newItem }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(resData => {
            let completedStyleString = resData.isComplete ? 'class="completed"' : '';
            // update the DOM (front-end)
            $('ul').prepend(`
            <li
                data-id="${resData.id || resData._id}"
                ${completedStyleString}
            > ${resData.description} 
                <span>
                    <i class="fa-solid fa-delete-left"></i>
                </span>
            </li>
            `)
            // clear the input
            $(this).val("");
        })
    }
});