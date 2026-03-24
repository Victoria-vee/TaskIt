        document.querySelector('.modal-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('task-title').value;
            const desc = document.getElementById('task-desc').value;
            const date = document.getElementById('task-date').value;
            const time = document.getElementById('task-time').value;

            const newTask = {
                id: Date.now().toString(),
                title: title,
                description: desc,
                date: date,
                time: time,
                deadline: new Date(`${date}T${time}`).getTime()
            };

            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(newTask);
            
            localStorage.setItem('tasks', JSON.stringify(tasks));

            window.location.href = 'dashboard.html';
        });