
function countItemsInPage(elementHeight: number, windowHeight: number): number {
    console.log(windowHeight, Math.floor(windowHeight / elementHeight))
    return Math.floor(windowHeight / elementHeight); // Количество элементов на странице
}
  
  export default countItemsInPage;