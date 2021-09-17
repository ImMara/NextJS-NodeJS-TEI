export const hydration = (data) =>{
    const string = JSON.stringify(data);
    return JSON.parse(string);
}