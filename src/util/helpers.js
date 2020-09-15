export function simonPrettyPrint(jsonList) {
    let retString = "[\n";
    let i = 0;
    for (const question of jsonList) {

        retString += "   {\n      \"category\": \"" + question.category + "\",\n      \"questions\": [\n"
        let j = 0;
        for (const questionText of question.questions) {
            if (j === question.questions.length - 1)
                retString += "         \"" + questionText + "\"\n";
            else
                retString += "         \"" + questionText + "\",\n";
            j++;
        }
        
        if (i === jsonList.length - 1) {
            retString += "      ]\n   }\n"
        } else {
            retString += "      ]\n   },\n"
        }
        i++;
    }
    retString += "]";
    return retString
}
