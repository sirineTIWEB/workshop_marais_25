// Progress bar that fills based on scroll proximity to the footer
(function() {
    const progressBar = document.getElementById('progressbar');

    function updateProgressBar() {
        // Get the total height of the document
        const documentHeight = document.documentElement.scrollHeight;

        // Get the current viewport height
        const windowHeight = window.innerHeight;

        // Get the current scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Calculate the maximum scrollable distance
        const maxScroll = documentHeight - windowHeight;

        // Calculate the scroll percentage (0 to 100)
        const scrollPercentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

        // Update the progress bar value
        progressBar.value = scrollPercentage;
    }

    // Update on scroll
    window.addEventListener('scroll', updateProgressBar);

    // Update on resize (in case content changes)
    window.addEventListener('resize', updateProgressBar);

    // Initial update
    updateProgressBar();
})();