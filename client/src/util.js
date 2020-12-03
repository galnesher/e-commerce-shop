export const serverURL = "https://gal-e-commerce-server.herokuapp.com";

export function formatCurrency(number) {
    return "$" + Number(number.toFixed(1)).toLocaleString() + " ";

}


export function setUserDetailsStorage(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userName', data.user.firstName + " " + data.user.lastName);
    localStorage.setItem('userEmail', data.user.emailAddress);
    localStorage.setItem('userId', data.user._id);
}

export function RemoveUserDetailsStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
}