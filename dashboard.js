        document.addEventListener('DOMContentLoaded', () => {
            const monthYear = document.querySelector('.month-year h2');
            const datesContainer = document.querySelector('.dates');
            const prevMonthBtn = document.querySelector('.prev-month');
            const nextMonthBtn = document.querySelector('.next-month');

            let currentDate = new Date();

            function renderCalendar() {
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();
                
                // Set Month and Year Text
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                monthYear.textContent = `${months[currentMonth]} ${currentYear}`;
                
                // Clear previous dates
                datesContainer.innerHTML = '';
                
                const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
                const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                
                // Add empty cells for days before the first day of the month
                for (let i = 0; i < firstDayOfMonth; i++) {
                    const emptyCell = document.createElement('div');
                    emptyCell.classList.add('date-cell', 'empty');
                    datesContainer.appendChild(emptyCell);
                }
                
                // Add actual days
                const today = new Date();
                for (let i = 1; i <= daysInMonth; i++) {
                    const dateCell = document.createElement('div');
                    dateCell.classList.add('date-cell');
                    dateCell.textContent = i;
                    
                    // Highlight today
                    if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                        dateCell.classList.add('today');
                    }
                    
                    datesContainer.appendChild(dateCell);
                }
            }

            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });

            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });

            renderCalendar();

            // Render Upcoming Deadlines
            function renderDeadlines() {
                const deadlinesContainer = document.getElementById('deadlines-container');
                if (!deadlinesContainer) return;

                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                
                // Clear container
                deadlinesContainer.innerHTML = '';

                if (tasks.length === 0) {
                    deadlinesContainer.innerHTML = `<div class="notask">
                        <h3>No Deadlines Yet</h3>
                    </div>`;
                } else {
                    // Sort tasks by closest deadline
                    tasks.sort((a, b) => a.deadline - b.deadline);

                    tasks.forEach(task => {
                        const card = document.createElement('div');
                        card.classList.add('deadline-cards');
                        
                        const titleEl = document.createElement('h3');
                        titleEl.textContent = task.title;
                        
                        const timeEl = document.createElement('h3');
                        timeEl.classList.add('time-left');
                        timeEl.id = `timer-${task.id}`;
                        
                        card.appendChild(titleEl);
                        card.appendChild(timeEl);
                        deadlinesContainer.appendChild(card);
                    });

                    // Initial timer setup & interval
                    updateTimers(tasks);
                    if (!window.deadlineInterval) {
                        window.deadlineInterval = setInterval(() => updateTimers(tasks), 1000);
                    }
                }
            }

            function updateTimers(tasks) {
                const now = new Date().getTime();

                tasks.forEach(task => {
                    const timeEl = document.getElementById(`timer-${task.id}`);
                    if (!timeEl) return;

                    const distance = task.deadline - now;

                    if (distance < 0) {
                        timeEl.textContent = "EXPIRED";
                        timeEl.style.color = "#ff4d4d"; // Red color for overdue
                    } else {
                        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        
                        let timeLeftStr = "";
                        if (days > 0) timeLeftStr += `${days}days `;
                        
                        // Format with leading zeros for h:m:s
                        const h = hours.toString().padStart(2, '0');
                        const m = minutes.toString().padStart(2, '0');
                        const s = seconds.toString().padStart(2, '0');

                        if (days > 0) {
                            timeLeftStr += `${h}hrs`;
                        } else {
                            timeLeftStr = `${h}:${m}:${s}`;
                        }

                        timeEl.textContent = timeLeftStr;
                    }
                });
            }

            renderDeadlines();
        });