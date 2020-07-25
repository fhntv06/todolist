let app = new Vue({
	el: "#app",
	data:{
		new_titles_todo:[
			{
				title: "",
				task: ""
			}
		],
		titles_todo:[],
		edit_todo: []
	},
	mounted() {
		if(localStorage.getItem('titles_todo')) {
			try {
			this.titles_todo = JSON.parse(localStorage.getItem('titles_todo'));
			} catch(e) {
				localStorage.removeItem('titles_todo');
			}
		}
		if(sessionStorage.getItem('edit_todo')) {
			try {
			this.edit_todo = JSON.parse(sessionStorage.getItem('edit_todo'));
			} catch(e) {
				sessionStorage.removeItem('edit_todo');
			}
		}
	},
	methods:{
		addContainer(){
			const titleTodo = document.querySelector(".titleTodo");
			const taskE = document.querySelectorAll(".taskE");
			let sum = "";
			let result = "";
			for(let i = 0; i < taskE.length; i++){
				if(taskE[0].value != ""){
					if(i > 0){
						taskE[i].parentElement.style.display = "none";
					}
				}
				if(taskE[i].value !== ""){
					result = 
						`<li class="list-item"><h4>${ taskE[i].value }</h4></li>`;
					sum += result;
					this.new_titles_todo.task = sum;
				}
			}
			if(taskE[0].value !== "" && titleTodo.value !== ""){
				this.titles_todo.push(
					{
						title: this.new_titles_todo.title,
						task: this.new_titles_todo.task		
					}
				);
				window.location.reload();
			}
			this.new_titles_todo.title = "";
			this.new_titles_todo.task = "";
			this.saveLocalTodo();
		},
		addInputTask(){
			const listTask = document.querySelector(".list-task");
			const input = 
				`
				<div class="container-task">
					<input class="dataTitle taskE" type="input" placeholder="Введите текст">
					<input type="checkbox" class="checkbox" style="display:none;">
				</div>
				`;
				listTask.insertAdjacentHTML("beforeend", input);
		},
		editTodo (index){
			const h3_value = document.querySelectorAll("h3");
			const listItems = document.querySelectorAll(".list-items");
			const containerData = document.querySelectorAll(".container-data");
			let sum = "";
			let result = "";
			
			for(let i = 0; i < containerData.length; i++){
				if(i == index){
					let listItem = listItems[index].querySelectorAll('.list-item');;
					for(let j = 0; j < listItem.length; j++){
						result = 
						`<div class="container-task">
							<input class="dataTitle taskE" type="input" placeholder="Введите задачу" value="${ listItem[j].textContent  }">
							<input type="checkbox" class="checkbox" onclick="completedTask()">
						</div>`;
						sum += result;
					}
					this.edit_todo = [];
					this.edit_todo.push(
						{
							title: h3_value[index].textContent,
							task: sum,
							index: index  
						}
					);
				}
			}
			let parsed_edit = JSON.stringify(this.edit_todo);
			sessionStorage.setItem('edit_todo', parsed_edit);
		},
		saveTodo(){
			const checkboxs = document.querySelectorAll(".checkbox");
			console.log(checkboxs);
			const title = document.querySelector(".title");
			const taskE = document.querySelectorAll(".taskE"); 
			console.log(taskE);
			let titles_todo = JSON.parse(localStorage.getItem('titles_todo'));
			let index = this.edit_todo[0].index;
			let sum = "";
			let result = "";
			for(let i = 0; i < checkboxs.length; i++){
				if(checkboxs[i].checked){
					taskE[i].style.display = "none";
				}else{
					result = 
					`<li class="list-item"><h4>${ taskE[i].value }</h4></li>`;
					sum += result;
				}
			}
			let spliceObj = {
				title: title.value,
				task: sum
			}
			titles_todo.splice(index , 1, spliceObj);
			localStorage.setItem('titles_todo', JSON.stringify(titles_todo));
			sessionStorage.removeItem("edit_todo");
		},
		removeContainer(index){
			const removeContainer = document.querySelectorAll(".removeContainer");
			this.titles_todo.splice(index,1);
			this.saveLocalTodo();
			removeContainer[index].classList.toggle("active");
			if(this.titles_todo == ""){
				localStorage.removeItem('titles_todo');
			}
		},
		saveLocalTodo() {
			let parsed_titles = JSON.stringify(this.titles_todo);
			localStorage.setItem('titles_todo', parsed_titles);
		},
		modalActive(index){
			const removeContainer = document.querySelectorAll(".removeContainer");
			removeContainer[index].classList.toggle("active");
		}
	}
});
function completedTask(){
	const checkboxs = document.querySelectorAll(".checkbox");
	const taskE = document.querySelectorAll(".taskE"); 
	for(let i = 0; i < checkboxs.length; i++){
		if(checkboxs[i].checked){
			taskE[i].classList.add("list-item-text");
		}else{
			taskE[i].classList.remove("list-item-text");
		}
	}
}