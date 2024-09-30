const mobileQuery = window.matchMedia('(max-width: 768px)');
const desktopQuery = window.matchMedia('(min-width: 769px)');
let endH2 = document.querySelector('.end > h2');
function handleMobileChange(e) {
    if (e.matches) {
        endH2.innerHTML = `        
            <p><span>Работай на себя</span></p>
            <p><span>и только по своим</span></p>
            <p><span>правилам!</span></p>
    `
    }
}
function handleDesktopChange(e) {
    if (e.matches) {
        endH2.innerHTML = `
            <p><span>Работай на себя</span></p>
            <p><span>и только по своим правилам!</span></p>
        `    
    }
}
mobileQuery.addListener(handleMobileChange);
desktopQuery.addListener(handleDesktopChange);
handleMobileChange(mobileQuery);