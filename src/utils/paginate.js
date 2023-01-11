import _ from "lodash"

export function panginate(items , pageNumber , pageSize){

    const startIndex = (pageNumber -1 ) * pageSize
    return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value()
}