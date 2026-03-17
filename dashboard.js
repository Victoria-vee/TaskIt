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
        });