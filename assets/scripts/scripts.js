//fade and toggle elements
function fadeAndToggleElements(oneElem , twoElem){
     $(oneElem).fadeToggle(200)
    setTimeout(()=>{
        $(twoElem).fadeToggle(200)
    },200)
}
//check variables for empty or not (easy way)
function empty(value) {
    return (
        value === undefined || 
        value === null || 
        value === false || 
        value === 0 || 
        value === "" || 
        (Array.isArray(value) && value.length === 0) || 
        (typeof value === "object" && Object.keys(value).length === 0)
    );
}