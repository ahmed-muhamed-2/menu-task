const addItems = document.querySelector('.add-item');
const itemList = document.querySelector('.plates');
const deletItem = document.querySelector('.delete');
const clearAll = document.querySelector('.clear');
const items = JSON.parse(localStorage.getItem('items')) || [];




function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name="item"]')).value;
    const item = {
        text,
        done: false
    }
    items.push(item);

    populateList(items, itemList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList){
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}>
                <label for="${i}">${plate.text}</label>
            </li>
        `
    }).join('');
}
function toggleDone(e){
    if(!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done; 
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemList);
}

function removeDoneItems() {
    const newItems = items.filter(it => it.done  !== true);
    populateList(newItems, itemList);
    localStorage.setItem('items', JSON.stringify(newItems));
}

function clearAllItems() {
    
}

addItems.addEventListener('submit', addItem);
itemList.addEventListener('click', toggleDone);
deletItem.addEventListener('click', removeDoneItems);
clearAll.addEventListener('click', clearAllItems);
populateList(items, itemList);