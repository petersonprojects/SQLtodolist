

    var addButton = document.getElementById('addButton');
    var addInput = document.getElementById('itemInput');
    var todoList = document.getElementById('todoList');
    var listArray = [];

    (()=>{
        //fetch to api to get all todos
        fetch('/api')
        .then(result=>result.json())
        .then(data => {
            //display all of our todos
            // data is an array of objects
            data.forEach(record =>{
                todoList.innerHTML += createItemDom(record.description, record.id);
            })
        })
    
    })()

    addButton.addEventListener('click', (e)=>{
        console.log('add button click');
        //add a todo item to the list
        fetch('/api', {
            method:"POST",
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                description: addInput.value
            })
        })
        .then(results => results.json())
        .then(data =>{
            data.forEach(record =>{
                todoList.innerHTML += createItemDom(record.description, record.id);
            })
        })
    })

    var createItemDom =  (description, id) => {

        let listItem = `<li id="${id.toString()}">
        <label>${description}</label>
    
            <button id="${id.toString()}" class="btn btn-success">Update</button>
            <button id="${id.toString()}" class="btn btn-danger">Delete</button>
            
        </li>`
    
        return listItem;
    }


