// Fungsi untuk melihat/sembunyikan password
function togglePassword(fieldId, iconId) {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

// Menjalankan validasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const submitBtn = document.getElementById("submitBtn");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("input", function () {
        let isValid = true;

        // Validasi Nama Lengkap
        const fullname = document.getElementById("fullname");
        const fullnameError = document.getElementById("fullnameError");
        if (fullname.value.trim().length < 3) {
            fullnameError.textContent = "Nama harus memiliki minimal 3 karakter.";
            isValid = false;
        } else {
            fullnameError.textContent = "";
        }

        // Validasi Email
        const email = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.value.match(emailPattern)) {
            emailError.textContent = "Format email tidak valid.";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        // Validasi Password
        const password = document.getElementById("password");
        const passwordError = document.getElementById("passwordError");
        if (password.value.length < 8) {
            passwordError.textContent = "Password harus minimal 8 karakter.";
            isValid = false;
        } else {
            passwordError.textContent = "";
        }

        // Validasi Konfirmasi Password
        const confirmPassword = document.getElementById("confirmPassword");
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        if (confirmPassword.value !== password.value) {
            confirmPasswordError.textContent = "Password tidak cocok.";
            isValid = false;
        } else {
            confirmPasswordError.textContent = "";
        }

        // Validasi Tanggal Lahir (Minimal 18 Tahun)
        const dob = document.getElementById("dob");
        const dobError = document.getElementById("dobError");
        const birthDate = new Date(dob.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && dayDiff < 0)) {
            dobError.textContent = "Anda harus berusia minimal 18 tahun.";
            isValid = false;
        } else {
            dobError.textContent = "";
        }

        // Validasi Nomor HP (Format Indonesia)
        const phone = document.getElementById("phone");
        const phoneError = document.getElementById("phoneError");
        const phonePattern = /^(\+62|62|08)[0-9]{9,13}$/;
        if (!phone.value.match(phonePattern)) {
            phoneError.textContent = "Nomor HP harus dalam format Indonesia.";
            isValid = false;
        } else {
            phoneError.textContent = "";
        }

        // Aktifkan tombol submit hanya jika semua validasi benar
        submitBtn.disabled = !isValid;
    });

    // Reset form dan tampilkan feedback visual saat submit sukses
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Tampilkan pesan sukses dengan animasi
        successMessage.style.display = "block";
        successMessage.style.opacity = "0";
        setTimeout(() => {
            successMessage.style.opacity = "1";
        }, 100);

        // Beri efek sukses pada input field
        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => {
            input.style.border = "2px solid green";
        });

        // Reset form setelah beberapa detik
        setTimeout(() => {
            form.reset();
            submitBtn.disabled = true;
            successMessage.style.display = "none"; // Sembunyikan pesan sukses

            // Kembalikan border input ke default
            inputs.forEach(input => {
                input.style.border = "";
            });

            // Hapus semua pesan error
            document.querySelectorAll(".error").forEach(error => {
                error.textContent = "";
            });

        }, 3000); // Hapus feedback setelah 3 detik
    });
});