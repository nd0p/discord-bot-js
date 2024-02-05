module.exports = (Intersection, commandObj) => {
    if (commandObj.devOnly) {
        if (Intersection.member.id !== '513203318605217792') {
            Intersection.reply("This Command is for developers only!");
            return true;
        }
    }
};