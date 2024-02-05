function getNumFromStyle(styleString) {
    const suffix = styleString.slice(-2);
    if( suffix === "px") return styleString.slice(0,-2);
    if( suffix.slice(-1) === '%') return styleString.slice(0, -1);
    return "Error";
}

export default getNumFromStyle