import { supabase } from './supabaseclient.js'

const form=document.querySelector('.auth-form')

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitbtn = document.querySelector('.auth-btn');

    submitbtn.innerText = 'Logging in...';
    submitbtn.disabled = true;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert(error.message);
        submitbtn.innerText = 'Login';
        submitbtn.disabled = false;
    } else {
        window.location.href = 'dashboard.html';
    }
});