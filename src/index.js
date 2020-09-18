import css from './index.css';

window.onload = function(){
    const taskField = document.querySelector('#taskField');
    const taskBtn = document.querySelector('#taskBtn');
    const allTask = document.querySelector('#allTask');

    taskField.addEventListener('keypress', function(event){
        if(event.keyCode === 13){
            let task = event.target.value;
            if(task != ''){
                addNewTask(allTask, task);
                this.value = '';
            }
        }
    })
}

function addNewTask(allTask, task){
    let col = create({'class':'col-sm-3'});
    let singleTask = create({'class':'single-task d-flex'});
    let singleTaskP = create('p');
    singleTaskP.innerHTML = task;
    let span = create('span', {'class': 'ml-auto'})
    span.innerHTML = `<i class="fas fa-times-circle"></i>`

    singleTask.appendChild(singleTaskP);
    singleTask.appendChild(span);

    span.addEventListener('click',function(){
        allTask.removeChild(col);
    })

    let taskController = createTaskController(singleTask);
    taskController.style.visibility = 'hidden';

    singleTask.appendChild(taskController);

    singleTask.onmouseenter = function(){
        taskController.style.visibility = 'visible';
    }
    singleTask.onmouseleave = function(){
        taskController.style.visibility = 'hidden';
    }

    col.appendChild(singleTask);
    allTask.appendChild(col);
    
}


function createTaskController(parent){
    let controlPanel = create({'class': 'task-control-panel'});

    let colorPlate = createColorPlate(parent);
    controlPanel.appendChild(colorPlate);

    let editBtn = createEditBtn(parent);
    controlPanel.appendChild(editBtn);

    return controlPanel;
}

function createColorPlate(parent){
    const colors = ['red','green','yellow','blue','grey','salmon'];

    let colorDiv = create({'class': 'd-flex'});
    colors.forEach(color => {
        let div = create({'class': 'color-circle ml-1'});
        div.style.background = color;
        div.addEventListener('click',function(){
            parent.style.background = color;
        })
        colorDiv.appendChild(div);
    });

    return colorDiv;
}

function createEditBtn(parent){
    let span = create('span',{'class':'ml-auto'});
    span.innerHTML = `<i class="fas fa-edit"></i>`;
    span.style.color = '#fff';
    span.addEventListener('click',function(){
        let p = document.querySelector('p');
        let textArea = create('textarea',{'class': 'inner-textarea'});
        textArea.style.width = parent.offsetwidth;
        textArea.style.height = parent.offsetheight;
        textArea.innerHTML = p.innerHTML;

        textArea.addEventListener('keypress',function(event){
            if(event.keyCode === 13){
                event.stopPropagation();
                if(this.value){
                    p.innerHTML = this.value;
                    parent.removeChild(textArea);
                }else{
                    alert('Please Insert Some Data')
                }
            }
        })

        parent.appendChild(textArea);
    })
    return span;
}

window.create = function () {

    if (arguments.length === 0) {
        return document.createElement('div');
    }

    if (arguments.length === 1 && typeof arguments[0] != 'object') {
        return document.createElement(arguments[0]);
    }

    var tag = arguments[0];
    var attr = arguments[1] || arguments[0];

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
        tag = 'div';
    }

    var element = document.createElement(tag);

    for (var i in attr) {
        element.setAttribute(i, attr[i]);
    }

    return element;
}