export const commaSeparatedList = items => {
  switch(items.length){
    case 1:
    case 2:
      return items.join(' and ')
    case 3:
      return items.join(', ').replace(/, ([^,]*)$/, ', and $1')
    default:
      return ""
  }
}

