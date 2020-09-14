export function simonPrettyPrint(jsonList) {
    let retString = "[\n";
    let i = 0;
    for (const question of jsonList) {
      if(i === jsonList.length - 1)
        retString += "   \"" +question + "\"\n";
      else
        retString += "   \"" +question + "\",\n";
      i++;
    }
    retString += "]\n";
    return retString
}
  