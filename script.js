document.addEventListener('DOMContentLoaded', () => {
    const stripeLink = 'https://buy.stripe.com/4gM8wQgjn2soeAu7Po9Zm00';

    // --- Modal Elements ---
    const termsModal = document.getElementById('termsModal');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const modalContinue = document.getElementById('modalContinue');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const privacyCheckbox = document.getElementById('privacyCheckbox');

    // --- Button Click Handlers ---
    const callButton = document.getElementById('callButton');
    const navCallButton = document.getElementById('navCallButton');
    const pricingCallButton = document.getElementById('pricingCallButton');

    const showTermsModal = () => {
        termsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const hideTermsModal = () => {
        termsModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Reset checkboxes
        termsCheckbox.checked = false;
        privacyCheckbox.checked = false;
        updateContinueButton();
    };

    const updateContinueButton = () => {
        const bothChecked = termsCheckbox.checked && privacyCheckbox.checked;
        modalContinue.disabled = !bothChecked;
    };

    const handleCallRedirect = () => {
        if (termsCheckbox.checked && privacyCheckbox.checked) {
            hideTermsModal();
            window.open(stripeLink, '_blank');
        }
    };

    // --- Modal Event Listeners ---
    if (modalClose) {
        modalClose.addEventListener('click', hideTermsModal);
    }
    if (modalCancel) {
        modalCancel.addEventListener('click', hideTermsModal);
    }
    if (modalContinue) {
        modalContinue.addEventListener('click', handleCallRedirect);
    }

    // --- Checkbox Event Listeners ---
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', updateContinueButton);
    }
    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', updateContinueButton);
    }

    // --- Close modal when clicking outside ---
    if (termsModal) {
        termsModal.addEventListener('click', (e) => {
            if (e.target === termsModal) {
                hideTermsModal();
            }
        });
    }

    // --- Call Button Event Listeners ---
    if (callButton) {
        callButton.addEventListener('click', showTermsModal);
    }
    if (navCallButton) {
        navCallButton.addEventListener('click', showTermsModal);
    }
    if (pricingCallButton) {
        pricingCallButton.addEventListener('click', showTermsModal);
    }

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navContainer = document.querySelector('.nav-container');

    if (navToggle && navContainer) {
        navToggle.addEventListener('click', () => {
            navContainer.classList.toggle('active');
        });
    }

    // --- Close mobile menu when a link is clicked ---
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
            }
        });
    });

    // --- Waveform Animation ---
    // The waveform animation is handled purely by CSS.
    // This section is a placeholder for any future JS-based animations.
    const waveformPlayer = document.getElementById('waveformPlayer');
    const playIcon = document.getElementById('playIcon');
    const audio = new Audio('assets/mark.m4a');

    if (waveformPlayer && playIcon && audio) {
        waveformPlayer.addEventListener('click', () => {
            if (audio.paused) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Audio playback failed:", error);
                        alert("Could not play the audio. Please check the browser console for more details.");
                    });
                }
            } else {
                audio.pause();
            }
        });

        audio.addEventListener('play', () => {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        });

        audio.addEventListener('pause', () => {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        });

        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
        });
    }
});