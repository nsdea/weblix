const PAGESTYLE = document.getElementById('pagestyle')
function updateSiteTheme(){
    const themelink = `/css/themes/${DARKMODE?'dark':'light'}.css`
    console.log(themelink)
    PAGESTYLE.href = themelink
}

var DARKMODE = window.matchMedia("(prefers-color-scheme: dark)").matches
updateSiteTheme()