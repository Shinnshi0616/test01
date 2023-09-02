const bg = Math.round(Math.random() * 15);
let back = require('../img/bg' + bg + '.png').default;
const sectionStyle = {
    backgroundImage: "url('" + back + "')",
    backgroundRepeat: "no-repeat",
    zIndex: 0,
    position: "relative",
    minHeight: "100%",
    backgroundSize: "100%",
    backgroundAttachment: "fixed" + ',' + "scroll",
    width: "100%",
}
export default sectionStyle
