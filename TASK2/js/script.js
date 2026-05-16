// =============================================
// TAB SWITCHING LOGIC (Contact Form & To-Do List)
// =============================================

// Get all tab elements
const contactTabBtn = document.getElementById('contactTabBtn');
const todoTabBtn = document.getElementById('todoTabBtn');
const contactSection = document.getElementById('contactSection');
const todoSection = document.getElementById('todoSection');

// Get navigation and hero buttons
const contactTabLink = document.getElementById('contactTabLink');
const todoTabLink = document.getElementById('todoTabLink');
const contactHeroBtn = document.getElementById('contactHeroBtn');
const todoHeroBtn = document.getElementById('todoHeroBtn');

// Function to switch tabs
function switchToContactTab() {
    // Update tab buttons
    contactTabBtn.classList.add('active');
    todoTabBtn.classList.remove('active');
    
    // Update content sections
    contactSection.classList.add('active');
    todoSection.classList.remove('active');
    
    // Update URL hash without scrolling
    history.pushState(null, null, '#contact');
}

function switchToTodoTab() {
    // Update tab buttons
    todoTabBtn.classList.add('active');
    contactTabBtn.classList.remove('active');
    
    // Update content sections
    todoSection.classList.add('active');
    contactSection.classList.remove('active');
    
    // Update URL hash without scrolling
    history.pushState(null, null, '#todo');
}

// Event listeners for tab buttons
contactTabBtn.addEventListener('click', switchToContactTab);
todoTabBtn.addEventListener('click', switchToTodoTab);

// Event listeners for navigation links
if (contactTabLink) {
    contactTabLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchToContactTab();
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if (todoTabLink) {
    todoTabLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchToTodoTab();
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Event listeners for hero buttons
if (contactHeroBtn) {
    contactHeroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchToContactTab();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if (todoHeroBtn) {
    todoHeroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchToTodoTab();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =============================================
// CONTACT FORM VALIDATION
// =============================================

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameErrorSpan = document.getElementById('nameError');
const emailErrorSpan = document.getElementById('emailError');
const successMsgDiv = document.getElementById('formSuccessMsg');

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email);
}

// Errors clear karna
function clearFieldErrors() {
    if (nameErrorSpan) nameErrorSpan.textContent = '';
    if (emailErrorSpan) emailErrorSpan.textContent = '';
    if (nameInput) nameInput.style.borderColor = '';
    if (emailInput) emailInput.style.borderColor = '';
}

// Error show karna
function showFieldError(field, errorSpan, message) {
    if (errorSpan) errorSpan.textContent = message;
    if (field) field.style.borderColor = '#ef4444';
}

// Form validation
function validateContactForm() {
    clearFieldErrors();
    let isValid = true;

    const nameValue = nameInput ? nameInput.value.trim() : '';
    if (nameValue === '') {
        showFieldError(nameInput, nameErrorSpan, '❌ Full name is required');
        isValid = false;
    }

    const emailValue = emailInput ? emailInput.value.trim() : '';
    if (emailValue === '') {
        showFieldError(emailInput, emailErrorSpan, '❌ Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        showFieldError(emailInput, emailErrorSpan, '❌ Enter a valid email (e.g., name@domain.com)');
        isValid = false;
    }
    return isValid;
}

// Form submit event
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateContactForm()) {
            const name = nameInput.value.trim();
            if (successMsgDiv) {
                successMsgDiv.classList.remove('hidden');
                successMsgDiv.innerHTML = `🎉 Thanks ${name}! Your message has been sent successfully!`;
            }
            form.reset();
            clearFieldErrors();
            setTimeout(() => {
                if (successMsgDiv) successMsgDiv.classList.add('hidden');
            }, 4000);
        } else {
            if (successMsgDiv) successMsgDiv.classList.add('hidden');
        }
    });
}

// Live error removal
if (nameInput) {
    nameInput.addEventListener('focus', () => {
        nameInput.style.borderColor = '';
        if (nameErrorSpan) nameErrorSpan.textContent = '';
    });
}

if (emailInput) {
    emailInput.addEventListener('focus', () => {
        emailInput.style.borderColor = '';
        if (emailErrorSpan) emailErrorSpan.textContent = '';
    });
}

// =============================================
// DYNAMIC TO-DO LIST
// =============================================

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addTodoBtn');
const todoContainer = document.getElementById('todoListContainer');
const taskCountSpan = document.getElementById('taskCount');
const completedCountSpan = document.getElementById('completedCount');

let tasks = [];

// Local storage se tasks load karna
function loadTasksFromLocal() {
    const stored = localStorage.getItem('apex_todo_tasks');
    if (stored) {
        tasks = JSON.parse(stored);
    } else {
        // Sample tasks
        tasks = [
            { text: '🌟 Check responsive design (resize window)', completed: false },
            { text: '✅ Test form validation with invalid email', completed: true },
            { text: '🎯 Add a new task dynamically', completed: false }
        ];
    }
    renderTodoList();
}

// Tasks ko local storage mein save karna
function saveTasksToLocal() {
    localStorage.setItem('apex_todo_tasks', JSON.stringify(tasks));
}

// Statistics update karna
function updateStats() {
    if (taskCountSpan && completedCountSpan) {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        taskCountSpan.textContent = total;
        completedCountSpan.textContent = completed;
    }
}

// To-Do list render karna
function renderTodoList() {
    if (!todoContainer) return;
    
    todoContainer.innerHTML = '';
    
    if (tasks.length === 0) {
        todoContainer.innerHTML = '<li class="empty-todo">✨ No tasks yet. Add something!</li>';
        updateStats();
        return;
    }
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        const taskSpan = document.createElement('span');
        taskSpan.className = 'todo-text';
        if (task.completed) {
            taskSpan.classList.add('completed');
        }
        taskSpan.innerHTML = `${task.completed ? '✅' : '○'} ${escapeHtml(task.text)}`;
        
        // Task complete toggle
        taskSpan.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            renderTodoList();
            saveTasksToLocal();
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑 Delete';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTodoList();
            saveTasksToLocal();
        });
        
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        todoContainer.appendChild(li);
    });
    
    updateStats();
}

// Escape HTML to prevent XSS
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Naya task add karna
function addNewTask() {
    if (!todoInput) return;
    
    const taskText = todoInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    tasks.push({ text: taskText, completed: false });
    todoInput.value = '';
    renderTodoList();
    saveTasksToLocal();
}

// Event listeners for To-Do List
if (addBtn) {
    addBtn.addEventListener('click', addNewTask);
}

if (todoInput) {
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addNewTask();
        }
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        if (navLinks) navLinks.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#' && targetId !== '#contact' && targetId !== '#todo') {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        }
    });
});

// Check URL hash on load
function checkInitialTab() {
    const hash = window.location.hash;
    if (hash === '#todo') {
        switchToTodoTab();
    } else {
        switchToContactTab();
    }
}

// Initialize To-Do List and check initial tab
loadTasksFromLocal();
checkInitialTab();