export default function conReducer(preState, action) {
    const { type, data } = action
    let isAdmin = ''
    // console.log(data)
    switch (type) {
        case "isUser":
            return data
        case "count":
            return data
        case "isAdmin":
            return data
        default:
            return isAdmin = false;
    }
    return preState
}