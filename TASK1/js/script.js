// JavaScript for Web Dev Basics
// Wait for DOM to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MAIN REQUIREMENT: Alert Button ==========
    const alertButton = document.getElementById('alertButton');
    const statusMessage = document.getElementById('statusMsg');
    
    if (alertButton) {
        alertButton.addEventListener('click', function() {
            // PRIMARY TASK: Show alert message when button is clicked
            alert('Hello! You clicked the button. JavaScript is working! 🎉');
            
            // EXTRA: Update status message on page (for better UX)
            if (statusMessage) {
                statusMessage.innerHTML = '✅ Alert triggered! JavaScript is active.';
                statusMessage.style.color = '#2e7d64';
                
                // Reset message after 2 seconds
                setTimeout(function() {
                    statusMessage.innerHTML = '💡 Button triggers a JavaScript alert';
                    statusMessage.style.color = '#718096';
                }, 2000);
            }
        });
    }
    
    // ========== Demo Link Handler (prevents page jump) ==========
    const demoLink = document.getElementById('demoLink');
    if (demoLink) {
        demoLink.addEventListener('click', function(event) {
            event.preventDefault();  // Prevents # from jumping to top
            alert('📖 This is a demo link.\n\nCheck out MDN or W3Schools for real documentation!');
        });
    }
    
    // ========== Console confirmation (developer log) ==========
    console.log('✅ Web Dev Basics loaded successfully!');
    console.log('📌 Features: Headings, Paragraphs, Images, Links, CSS Styling, Alert Button');
});