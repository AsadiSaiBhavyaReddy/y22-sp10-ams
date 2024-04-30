
const initState = "Login"
export default function NavReducer(state=initState, action){
    switch(action.type) {
        case "Login":
            return "Login";
        case "Registration":
            return "Registration";
        case "Profile":
            return "Profile";
        case "Entry":
            return "Entry";
        case "Home":
            return "Home";
        case "Details":
            return "Details";
        case "Detail":
            return "Detail";
        case "SendMail":
            return "SendMail";
        case "Footer":
            return "Footer";
        case "Shop":
            return "Shop";
        case "Store":
            return "Store";
        default:
            return "Login";
    }

}