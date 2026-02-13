import { supabase } from './supabaseclient.js'

const form = document.querySelector('.auth-form')

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirm-password').value;
    const submitbtn = document.querySelector('.auth-btn');

    // Validation
    if (password !== confirmpassword) {
        alert("Passwords do not match!");
        return;
    }

    submitbtn.innerText = 'Creating account...';
    submitbtn.disabled = true;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                display_name: name,
            }
        }
    });

    if (error) {
        alert(error.message);
        submitbtn.innerText = 'Register';
        submitbtn.disabled = false;
    } else {
        window.location.href = 'dashboard.html';
    }
});